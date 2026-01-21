/**
 * Article Details Screen Component
 * Displays the full content of a selected news article
 * Shows article image, title, source, date, and content
 */

import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  Linking,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

// Import color and spacing constants
import { COLORS, SPACING, FONT_SIZES } from '../utils/constants';

/**
 * ArticleDetailsScreen Component
 * Shows detailed view of a news article with external link option
 * @param {object} route - React Navigation route object containing article data
 */
const ArticleDetailsScreen = ({ route }) => {
  // Extract article data from navigation params
  const { article } = route.params;

  /**
   * Format date to readable format
   * Converts ISO date string to readable date format
   * @param {string} dateString - ISO format date string
   * @returns {string} - Formatted date string
   */
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Unknown date';
    }
  };

  /**
   * Handle opening the article in external browser
   * Uses Linking API to open article URL
   */
  const handleReadFull = async () => {
    try {
      const supported = await Linking.canOpenURL(article.url);
      if (supported) {
        await Linking.openURL(article.url);
      } else {
        console.error('Cannot open URL:', article.url);
      }
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Article Image */}
        {article.urlToImage && (
          <Image
            source={{ uri: article.urlToImage }}
            style={styles.articleImage}
            resizeMode="cover"
          />
        )}

        {/* Content Container */}
        <View style={styles.contentContainer}>
          {/* Article Source and Date */}
          <View style={styles.metaContainer}>
            <Text style={styles.source}>
              {article.source?.name || 'Unknown Source'}
            </Text>
            <Text style={styles.date}>
              {formatDate(article.publishedAt)}
            </Text>
          </View>

          {/* Article Title */}
          <Text style={styles.title}>{article.title}</Text>

          {/* Author Information */}
          {article.author && (
            <Text style={styles.author}>By {article.author}</Text>
          )}

          {/* Divider */}
          <View style={styles.divider} />

          {/* Article Description */}
          {article.description && (
            <Text style={styles.description}>{article.description}</Text>
          )}

          {/* Article Content */}
          {article.content && (
            <Text style={styles.content}>{article.content}</Text>
          )}

          {/* Read Full Article Button */}
          <TouchableOpacity
            style={styles.readFullButton}
            onPress={handleReadFull}
            activeOpacity={0.8}
          >
            <Text style={styles.readFullButtonText}>
              Read Full Article →
            </Text>
          </TouchableOpacity>

          {/* Additional spacing at bottom */}
          <View style={styles.bottomSpacer} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Styles for ArticleDetailsScreen component
 */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  articleImage: {
    width: '100%',
    height: 250,
    backgroundColor: COLORS.border,
  },
  contentContainer: {
    padding: SPACING.lg,
  },
  metaContainer: {
    marginBottom: SPACING.md,
  },
  source: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  date: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.lightText,
    fontWeight: '500',
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.md,
    lineHeight: 28,
  },
  author: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.lightText,
    fontStyle: 'italic',
    marginBottom: SPACING.md,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
  description: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    lineHeight: 22,
    marginBottom: SPACING.lg,
    fontWeight: '600',
  },
  content: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    lineHeight: 24,
    marginBottom: SPACING.lg,
  },
  readFullButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  readFullButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontWeight: '700',
  },
  bottomSpacer: {
    height: SPACING.xl,
  },
});

export default ArticleDetailsScreen;
