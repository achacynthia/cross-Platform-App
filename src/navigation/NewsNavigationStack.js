/**
 * Navigation Stack Configuration
 * Sets up the navigation flow between screens
 * Uses React Navigation Stack Navigator for screen transitions
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import ArticleDetailsScreen from '../screens/ArticleDetailsScreen';

// Import color constants for header styling
import { COLORS } from '../utils/constants';

/**
 * Create a native stack navigator
 * Provides native-like transitions and animations on iOS and Android
 */
const Stack = createNativeStackNavigator();

/**
 * NewsNavigationStack Component
 * Defines the navigation structure with Home and Article Details screens
 * Configures header styling and navigation options
 */
const NewsNavigationStack = () => {
  return (
    <Stack.Navigator
      // Default screen options for all screens in the stack
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.white,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        headerBackTitle: 'Back',
        // Use the default transitions
        animationEnabled: true,
      }}
    >
      {/* Home Screen - News Feed */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '📰 News Feed',
          headerShown: true,
        }}
      />

      {/* Article Details Screen */}
      <Stack.Screen
        name="ArticleDetails"
        component={ArticleDetailsScreen}
        options={({ route }) => ({
          title: 'Article Details',
          // Custom header back behavior
          headerBackTitleVisible: false,
        })}
      />
    </Stack.Navigator>
  );
};

export default NewsNavigationStack;
