/**
 * News Article Card Component
 * Reusable card component that displays a single news article
 * Shows article image, title, description, and source
 */

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

// Import color and spacing constants
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../utils/constants';

/**
 * NewsArticleCard Component
 * Displays a single article in a card format with image and text
 * @param {object} article - Article data object from API
 * @param {function} onPress - Callback function when card is pressed
 */
const NewsArticleCard = ({ article, onPress }) => {
  /**
   * Truncate text to a maximum number of lines
   * Ensures consistent card height
   * @param {string} text - Text to truncate
   * @param {number} maxLines - Maximum number of lines
   * @returns {string} - Truncated text
   */
  const truncateText = (text, maxLines = 2) => {
    if (!text) return '';
    const lines = text.split('\n');
    return lines.slice(0, maxLines).join('\n');
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Article Image Container */}
      <View style={styles.imageContainer}>
        {article.urlToImage ? (
          <Image
            source={{ uri: article.urlToImage }}
            style={styles.articleImage}
            resizeMode="cover"
          />
        ) : (
          // Placeholder when no image is available
          <View style={[styles.articleImage, styles.imagePlaceholder]}>
            <Text style={styles.placeholderText}>📰</Text>
          </View>
        )}
      </View>

      {/* Card Content Container */}
      <View style={styles.contentContainer}>
        {/* Article Source Badge */}
        <Text style={styles.source} numberOfLines={1}>
          {article.source?.name || 'Unknown'}
        </Text>

        {/* Article Title */}
        <Text
          style={styles.title}
          numberOfLines={3}
          ellipsizeMode="tail"
        >
          {article.title}
        </Text>

        {/* Article Description */}
        {article.description && (
          <Text
            style={styles.description}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {truncateText(article.description)}
          </Text>
        )}

        {/* Published Date and Read More Indicator */}
        <View style={styles.footerContainer}>
          <Text style={styles.date} numberOfLines={1}>
            {new Date(article.publishedAt).toLocaleDateString()}
          </Text>
          <Text style={styles.readMore}>Read more →</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

/**
 * Styles for NewsArticleCard component
 */
const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.sm,
    marginVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: COLORS.border,
    overflow: 'hidden',
  },
  articleImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  placeholderText: {
    fontSize: FONT_SIZES.xxl,
  },
  contentContainer: {
    padding: SPACING.md,
  },
  source: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: FONT_SIZES.md,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.sm,
    lineHeight: 20,
  },
  description: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.lightText,
    lineHeight: 18,
    marginBottom: SPACING.md,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  date: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.lightText,
    fontWeight: '500',
  },
  readMore: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default NewsArticleCard;
