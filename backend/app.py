from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
from werkzeug.utils import secure_filename
import json
from document_processor import DocumentProcessor

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-key-please-change')
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Ensure upload directory exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Initialize document processor
doc_processor = DocumentProcessor()

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'message': 'Flask backend is running'
    })

@app.route('/api/analyze-documents', methods=['POST'])
def analyze_documents():
    try:
        # Check if all required files are present
        required_files = ['lease', 'ledger', 'addendum']
        for file_key in required_files:
            if file_key not in request.files:
                return jsonify({
                    'error': f'Missing required file: {file_key}'
                }), 400

        # Save uploaded files
        file_paths = {}
        for file_key in required_files:
            file = request.files[file_key]
            if file.filename == '':
                return jsonify({
                    'error': f'No file selected for {file_key}'
                }), 400
            
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], f"{file_key}_{filename}")
            file.save(file_path)
            file_paths[file_key] = file_path

        # Validate documents
        errors = doc_processor.validate_documents(
            file_paths['lease'],
            file_paths['ledger'],
            file_paths['addendum']
        )
        
        if errors:
            return jsonify({
                'error': 'Document validation failed',
                'details': errors
            }), 400

        # Process documents
        result = doc_processor.process_documents(
            file_paths['lease'],
            file_paths['ledger'],
            file_paths['addendum']
        )

        # Clean up uploaded files
        for file_path in file_paths.values():
            if os.path.exists(file_path):
                os.remove(file_path)

        return jsonify(result)

    except Exception as e:
        return jsonify({
            'error': 'An error occurred while processing the documents',
            'details': str(e)
        }), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True) 