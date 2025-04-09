import os
from typing import Dict, List, Optional
import PyPDF2
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

class DocumentProcessor:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        
    def extract_text_from_pdf(self, file_path: str) -> str:
        """Extract text content from a PDF file."""
        text = ""
        with open(file_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            for page in pdf_reader.pages:
                text += page.extract_text()
        return text

    def process_documents(self, lease_path: str, ledger_path: str, addendum_path: str) -> Dict:
        """
        Process all documents and get LLM analysis.
        
        Args:
            lease_path: Path to the lease agreement PDF
            ledger_path: Path to the ledger PDF
            addendum_path: Path to the deposit waiver addendum PDF
            
        Returns:
            Dict containing the LLM's analysis and recommendations
        """
        # Extract text from all documents
        lease_text = self.extract_text_from_pdf(lease_path)
        ledger_text = self.extract_text_from_pdf(ledger_path)
        addendum_text = self.extract_text_from_pdf(addendum_path)

        # Read the prompt template
        with open('prompts/lease_analysis_prompt.txt', 'r') as f:
            prompt_template = f.read()

        # Prepare the complete prompt with document contents
        complete_prompt = f"""
{prompt_template}

DOCUMENT CONTENTS:

LEASE AGREEMENT:
{lease_text}

LEDGER:
{ledger_text}

DEPOSIT WAIVER ADDENDUM:
{addendum_text}
"""

        # Get LLM response
        response = self.client.chat.completions.create(
            model="gpt-4-turbo-preview",  # or your preferred model
            messages=[
                {"role": "system", "content": "You are a lease document analyzer and claim predictor."},
                {"role": "user", "content": complete_prompt}
            ],
            temperature=0.2,  # Lower temperature for more consistent results
            response_format={ "type": "json_object" }
        )

        return response.choices[0].message.content

    def validate_documents(self, lease_path: str, ledger_path: str, addendum_path: str) -> List[str]:
        """
        Validate the uploaded documents.
        
        Returns:
            List of error messages, empty if all valid
        """
        errors = []
        
        # Check if files exist
        for path, name in [(lease_path, "Lease"), (ledger_path, "Ledger"), (addendum_path, "Addendum")]:
            if not os.path.exists(path):
                errors.append(f"{name} document not found")
                continue
                
            # Check if file is PDF
            if not path.lower().endswith('.pdf'):
                errors.append(f"{name} must be a PDF file")
                
        return errors 