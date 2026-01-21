/**
 * Main App Component
 * Entry point for the News Application
 */

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, RefreshControl, StyleSheet, FlatList } from 'react-native';

// Import API and constants
import { fetchTopHeadlines } from './src/utils/newsAPI';
import { COLORS, SPACING, FONT_SIZES } from './src/utils/constants';
import NewsArticleCard from './src/components/NewsArticleCard';

/**
 * Main App Component - Simplified for web compatibility
 */
const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Fetch news on mount
  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      if (!refreshing) setLoading(true);
      setError(null);

      const result = await fetchTopHeadlines('us');
      if (result.success) {
        const filtered = result.articles.filter(a => a.urlToImage && a.urlToImage.trim());
        setArticles(filtered);
      } else {
        setError('Failed to fetch news. Please check your API key.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error loading news');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadNews();
  };

  // Show selected article details
  if (selectedArticle) {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.detailView}>
          <View style={styles.articleImage}>
            <Text style={styles.imagePlaceholder}>📰</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.source}>{selectedArticle.source?.name || 'News'}</Text>
            <Text style={styles.title}>{selectedArticle.title}</Text>
            <Text style={styles.description}>{selectedArticle.description}</Text>
            <Text style={styles.article}>{selectedArticle.content}</Text>
            <Text style={styles.backButton} onPress={() => setSelectedArticle(null)}>
              ← Back to Feed
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  // Show news feed
  if (loading && articles.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading news...</Text>
      </View>
    );
  }

  if (error && articles.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>⚠️ {error}</Text>
        <Text style={styles.retryText} onPress={loadNews}>
          Tap to retry
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>📰 News Feed</Text>
      </View>
      <FlatList
        data={articles}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <NewsArticleCard
              article={item}
              onPress={() => setSelectedArticle(item)}
            />
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        scrollEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: SPACING.lg,
    alignItems: 'center',
    paddingTop: SPACING.xl,
  },
  headerText: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  loadingText: {
    marginTop: SPACING.lg,
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
  },
  errorText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.error,
    marginBottom: SPACING.lg,
  },
  retryText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.primary,
    marginTop: SPACING.lg,
    textDecorationLine: 'underline',
  },
  cardWrapper: {
    margin: SPACING.sm,
  },
  detailView: {
    flex: 1,
  },
  articleImage: {
    width: '100%',
    height: 200,
    backgroundColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    fontSize: 50,
  },
  content: {
    padding: SPACING.lg,
  },
  source: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  title: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  description: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    marginBottom: SPACING.md,
    fontWeight: '600',
  },
  article: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  backButton: {
    fontSize: FONT_SIZES.md,
    color: COLORS.primary,
    fontWeight: 'bold',
    padding: SPACING.md,
    marginTop: SPACING.lg,
  },
});

export default App;
