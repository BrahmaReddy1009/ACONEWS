import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const categories = [
  'general', 
  'world', 
  'nation', 
  'business', 
  'technology', 
  'entertainment', 
  'sports', 
  'science', 
  'health'
];

const countries = [
  'us', 'gb', 'in', 'au', 'ca', 'cn', 'fr', 'de', 'jp', 'it', 'es', 
  'br', 'ru', 'sg', 'hk', 'za', 'eg', 'ng', 'mx', 'pt', 'tw', 'ua'
];

const languages = [
  'en', 'es', 'fr', 'de', 'ar', 'zh', 'nl', 'hi', 'it', 'ja', 
  'ko', 'pl', 'pt', 'ru', 'sv', 'tr', 'vi', 'th', 'bn', 'ml', 'ro'
];

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('technology');
  const [country, setCountry] = useState('us');
  const [language, setLanguage] = useState('en');
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const articlesPerPage = 9;

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/news', {
        params: {
          q: query,
          page: page,
          articlesPerPage: articlesPerPage,
          topic: category,
          lang: language,
          country: country
        }
      });

      const data = response.data;
      setArticles(data.articles);
      setTotalArticles(data.totalArticles);
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('Failed to fetch news. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [query, page, category, language, country]);

  useEffect(() => {
    fetchNews();
  }, [page, category, language, country, query, fetchNews]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); 
    fetchNews();
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(totalArticles / articlesPerPage)) {
      setPage(newPage);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4 ">
      <form onSubmit={handleSearch} className="text-center mb-6">
        <div className="flex justify-center space-x-2 mb-4">
          <input
            type="text"
            placeholder="Search news..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border rounded-lg px-4 py-2 transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg transition-transform duration-300 hover:scale-105">
            Search
          </button>
        </div>

        <div className="flex justify-center space-x-4">
          <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }} className="border rounded-lg px-4 py-2 transition duration-300 hover:bg-gray-100 cursor-pointer">
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>

          <select value={country} onChange={(e) => { setCountry(e.target.value); setPage(1); }} className="border rounded-lg px-4 py-2 transition duration-300 hover:bg-gray-100 cursor-pointer">
            {countries.map((cntry) => (
              <option key={cntry} value={cntry}>{cntry.toUpperCase()}</option>
            ))}
          </select>

          <select value={language} onChange={(e) => { setLanguage(e.target.value); setPage(1); }} className="border rounded-lg px-4 py-2 transition duration-300 hover:bg-gray-100 cursor-pointer">
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang.toUpperCase()}</option>
            ))}
          </select>
        </div>
      </form>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer">
        {articles.map((article, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:scale-105">
            <img className="w-full h-48 object-cover" src={article.image} alt={article.title} />
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800 line-clamp-2">{article.title}</h2>
              <p className="text-gray-600 mt-2 line-clamp-3">{article.description}</p>
              <div className="mt-3 flex justify-between text-black text-sm font-semibold">
               
                <a href={article.source.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-800 mt-3 block">
                <span>{article.source.name}</span>
              </a>
                <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
              </div>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mt-3 block">
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        {page > 1 && (
          <button onClick={() => handlePageChange(page - 1)} className="bg-gray-300 px-4 py-2 rounded-lg mr-2 hover:bg-blue-600 transition duration-300">
            Previous
          </button>
        )}
        {page * articlesPerPage < totalArticles && (
          <button onClick={() => handlePageChange(page + 1)} className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default News;
