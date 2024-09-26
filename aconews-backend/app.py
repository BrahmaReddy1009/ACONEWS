from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Enable CORS for the specific route from the React app
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Use the API key from the environment variable
API_KEY = os.getenv('GNEWS_API_KEY')
BASE_URL = 'https://gnews.io/api/v4/'

@app.route('/api/news', methods=['GET'])
def get_news():
    # Retrieve query parameters
    query = request.args.get('q', '')  # Search query
    page = int(request.args.get('page', 1))  # Page number
    topic = request.args.get('topic', 'technology')  # Default topic
    lang = request.args.get('lang', 'en')  # Language
    country = request.args.get('country', '')  # Country code
    articles_per_page = int(request.args.get('articlesPerPage', 9))  # Articles per page

    # Prepare parameters for GNews API
    params = {
        'q': query,
        'topic': topic,
        'lang': lang,
        'country': country,  # Add country parameter
        'page': page,
        'max': articles_per_page,
        'apikey': API_KEY,
    }

    try:
        # Fetch news articles from GNews API
        response = requests.get(f'{BASE_URL}top-headlines', params=params)  # Correct endpoint
        response.raise_for_status()  # Raise an error for bad responses
        data = response.json()

        # Return formatted JSON response
        return jsonify({
            'articles': data.get('articles', []),
            'totalArticles': data.get('totalArticles', 0),
            'page': page,
            'articlesPerPage': articles_per_page
        }), 200

    except requests.exceptions.RequestException as e:
        # Return error response if the request fails
        return jsonify({'error': 'Failed to fetch news', 'details': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
