# Flask Backend

This is the backend service for the application built with Flask.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
- On macOS/Linux:
```bash
source venv/bin/activate
```
- On Windows:
```bash
.\venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Configure environment variables:
- Copy `.env.example` to `.env` (if not already done)
- Update the values in `.env` as needed

## Running the Application

1. Make sure your virtual environment is activated
2. Run the Flask application:
```bash
python app.py
```

The server will start on http://localhost:5000

## API Endpoints

- `GET /api/health`: Health check endpoint
- `POST /api/analyze-documents`: Endpoint for analyzing uploaded documents
  - Required files: lease, ledger, addendum
  - Optional form data: claim_amount 