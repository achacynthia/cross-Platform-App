/**
 * Home Screen Component
 * Displays a list of news articles fetched from the News API
 * Includes pull-to-refresh functionality
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Text,
} from 'react-native';

// Import API and UI utilities
import { fetchTopHeadlines } from '../utils/newsAPI';
import { COLORS, SPACING } from '../utils/constants';
import NewsArticleCard from '../components/NewsArticleCard';

/**
 * HomeScreen Component
 * Main screen showing the news feed with pull-to-refresh capability
 * @param {object} navigation - React Navigation object for screen navigation
 */
const HomeScreen = ({ navigation }) => {
  // State management for articles, loading, and error states
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch news articles from the API
   * Called on component mount and when user pulls to refresh
   */
  const loadNews = async () => {
    try {
      // Only show loading spinner on initial load
      if (!refreshing) {
        setLoading(true);
      }
      
      setError(null);
      
      // Fetch top headlines for US
      const result = await fetchTopHeadlines('us');
      
      if (result.success) {
        // Filter out articles with null images for better UX
        const filteredArticles = result.articles.filter(
          (article) => article.urlToImage && article.urlToImage.trim() !== ''
        );
        setArticles(filteredArticles);
      } else {
        setError(result.error || 'Failed to fetch news. Please try again.');
      }
    } catch (err) {
      console.error('Error loading news:', err);
      setError('An unexpected error occurred.');
    } finally {
      // Stop loading and refreshing indicators
      setLoading(false);
      setRefreshing(false);
    }
  };

  /**
   * Handle pull-to-refresh action
   * User pulls down to refresh the news feed
   */
  const handleRefresh = () => {
    setRefreshing(true);
    loadNews();
  };

  /**
   * Load news when component mounts
   */
  useEffect(() => {
    loadNews();
  }, []);

  /**
   * Handle article card press - navigate to details screen
   * @param {object} article - The article object to display
   */
  const handleArticlePress = (article) => {
    navigation.navigate('ArticleDetails', { article });
  };

  /**
   * Render loading indicator while fetching data
   */
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading news...</Text>
      </View>
    );
  }

  /**
   * Render error message if API call fails
   */
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>⚠️ {error}</Text>
        <Text 
          style={styles.retryText}
          onPress={loadNews}
        >
          Tap to retry
        </Text>
      </View>
    );
  }

  /**
   * Render empty state if no articles are available
   */
  if (articles.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No articles available</Text>
      </View>
    );
  }

  /**
   * Main render - display articles in a FlatList with pull-to-refresh
   */
  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        // Use article URL as unique key
        keyExtractor={(item) => item.url}
        // Render each article as a card component
        renderItem={({ item }) => (
          <NewsArticleCard 
            article={item} 
            onPress={() => handleArticlePress(item)}
          />
        )}
        // Pull-to-refresh control
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        // Add spacing between items
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        // Optimize rendering of long lists
        removeClippedSubviews={true}
        // Content container padding
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

/**
 * Styles for HomeScreen component
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  flatListContent: {
    paddingVertical: SPACING.sm,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.lg,
  },
  loadingText: {
    marginTop: SPACING.lg,
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    color: COLORS.error,
    textAlign: 'center',
    marginBottom: SPACING.lg,
    fontWeight: '600',
  },
  retryText: {
    fontSize: 14,
    color: COLORS.primary,
    marginTop: SPACING.lg,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.lightText,
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.sm,
  },
});

export default HomeScreen;
