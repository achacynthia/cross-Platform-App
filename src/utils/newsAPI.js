/**
 * API Service Module
 * Handles all API requests for fetching news articles
 * Using NewsAPI as the backend service
 */

import axios from 'axios';

// Replace with your actual API key from https://newsapi.org
const API_KEY = '8f07b0ea345842328196b3a97b393740';
const BASE_URL = 'https://newsapi.org/v2';

/**
 * Create an axios instance with default configuration
 */
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

/**
 * Fetch top headlines from the News API
 * @param {string} country - Country code (e.g., 'us', 'gb')
 * @returns {Promise} - Promise with articles data
 */
export const fetchTopHeadlines = async (country = 'us') => {
  try {
    const response = await apiClient.get('/top-headlines', {
      params: {
        country,
        apiKey: API_KEY,
      },
    });
    return {
      success: true,
      articles: response.data.articles,
      total: response.data.totalResults,
    };
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    return {
      success: false,
      error: error.message,
      articles: [],
    };
  }
};

/**
 * Search articles by keyword
 * @param {string} keyword - Search keyword
 * @returns {Promise} - Promise with articles data
 */
export const searchArticles = async (keyword) => {
  try {
    const response = await apiClient.get('/everything', {
      params: {
        q: keyword,
        apiKey: API_KEY,
        sortBy: 'publishedAt',
      },
    });
    return {
      success: true,
      articles: response.data.articles,
    };
  } catch (error) {
    console.error('Error searching articles:', error);
    return {
      success: false,
      error: error.message,
      articles: [],
    };
  }
};

export default {
  fetchTopHeadlines,
  searchArticles,
};
