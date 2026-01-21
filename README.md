# 📰 News App - React Native + Expo

A beginner-friendly cross-platform news application built with **React Native** and **Expo CLI**. This app demonstrates key concepts in mobile development including API integration, navigation, state management, and UI design.

## 📋 Features

- ✅ **News Feed**: Display latest news articles from NewsAPI
- ✅ **Pull-to-Refresh**: Refresh the news feed by pulling down
- ✅ **Article Details**: View full article content and metadata
- ✅ **Cross-Platform**: Runs on both Android and iOS
- ✅ **Beginner-Friendly**: Well-commented, modular code structure
- ✅ **Error Handling**: Graceful error states and user feedback
- ✅ **Clean UI**: Modern, responsive design with consistent styling

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher) - [Download](https://nodejs.org)
- **Expo CLI** - Install globally: `npm install -g expo-cli`
- **Android Studio** (for Android Emulator) - [Download](https://developer.android.com/studio)
- **Text Editor/IDE** - VS Code recommended - [Download](https://code.visualstudio.com)

### Step 1: Get NewsAPI Key

1. Visit [NewsAPI.org](https://newsapi.org)
2. Sign up for a free account
3. Copy your API key

### Step 2: Configure API Key

1. Open `src/utils/newsAPI.js`
2. Replace `YOUR_NEWS_API_KEY_HERE` with your actual NewsAPI key:
   ```javascript
   const API_KEY = 'your_actual_api_key_here';
   ```

### Step 3: Install Dependencies

Navigate to the project directory and install dependencies:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

### Step 4: Start the Development Server

```bash
npm start
# or
expo start
```

This will display a QR code in the terminal.

### Step 5: Run on Android Emulator

**Option A: Using Expo CLI (Recommended for beginners)**

1. Press `a` in the terminal to open Android Emulator
2. Expo will build and run the app automatically

**Option B: Manual with Android Studio**

1. Open Android Studio
2. Launch the Android Emulator
3. Press `a` in the terminal
4. The app will install and run on the emulator

### Step 6: Test the App

- **View News Feed**: Swipe down to refresh articles
- **Read Article**: Tap any article card to see full details
- **Open in Browser**: Tap "Read Full Article →" button to open in browser

## 📁 Project Structure

```
NewsApp/
├── App.js                          # Main app entry point
├── app.json                        # Expo configuration
├── package.json                    # Dependencies and scripts
├── babel.config.js                 # Babel configuration
├── README.md                       # This file
│
└── src/
    ├── components/
    │   └── NewsArticleCard.js      # Reusable article card component
    │
    ├── screens/
    │   ├── HomeScreen.js           # News feed screen
    │   └── ArticleDetailsScreen.js # Article detail view
    │
    ├── navigation/
    │   └── NewsNavigationStack.js  # Navigation configuration
    │
    └── utils/
        ├── constants.js            # App colors, spacing, sizes
        └── newsAPI.js              # API service functions
```

## 🔧 Key Components Explained

### HomeScreen (`src/screens/HomeScreen.js`)
- Fetches news articles from NewsAPI
- Displays articles in a FlatList
- Implements pull-to-refresh functionality
- Handles loading and error states

### ArticleDetailsScreen (`src/screens/ArticleDetailsScreen.js`)
- Shows full article content
- Displays metadata (author, date, source)
- Links to read the full article in browser

### NewsArticleCard (`src/components/NewsArticleCard.js`)
- Reusable card component for displaying articles
- Shows image, title, description, and source
- Touchable with visual feedback

### Navigation (`src/navigation/NewsNavigationStack.js`)
- Defines the navigation flow
- Styled header with app theme colors
- Stack-based navigation between screens

## 📚 Learning Resources

### React Native Concepts Used

1. **Functional Components & Hooks**
   - `useState` - State management
   - `useEffect` - Side effects and lifecycle

2. **Core Components**
   - `View` - Container component
   - `Text` - Display text
   - `FlatList` - Efficient list rendering
   - `Image` - Display images
   - `ScrollView` - Scrollable content
   - `TouchableOpacity` - Interactive elements

3. **Navigation**
   - React Navigation Stack Navigator
   - Screen transitions
   - Parameter passing

4. **Styling**
   - `StyleSheet.create()` - Optimized styles
   - Responsive design patterns
   - Safe area handling

5. **API Integration**
   - Async/await for HTTP requests
   - Error handling
   - Data transformation

## 🐛 Troubleshooting

### "Module not found" Error
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### API Key Error / No Articles Showing
1. Verify your API key is correct in `src/utils/newsAPI.js`
2. Check NewsAPI website to ensure your account is active
3. Check internet connectivity

### Emulator Not Starting
1. Open Android Studio
2. Go to AVD Manager
3. Click the Play button to start an emulator
4. Return to terminal and press `a`

### App Crashes on Launch
1. Check console for error messages
2. Ensure all dependencies are installed: `npm install`
3. Try clearing cache: `expo start -c`

## 🎯 Next Steps & Enhancements

This is a beginner template. Here are features you can add:

- [ ] **Search Functionality** - Filter articles by keyword
- [ ] **Category Filtering** - Browse news by category (sports, tech, business)
- [ ] **Favorites** - Save articles locally with AsyncStorage
- [ ] **Dark Mode** - Theme switching based on system preference
- [ ] **Pagination** - Load more articles
- [ ] **News Source Selection** - Filter by news outlet
- [ ] **Push Notifications** - Notify users of breaking news
- [ ] **Offline Support** - Cache articles for offline viewing

## 📖 Code Example Walkthrough

### Fetching Articles in HomeScreen

```javascript
// 1. Define state variables
const [articles, setArticles] = useState([]);
const [loading, setLoading] = useState(true);

// 2. Create async function to fetch data
const loadNews = async () => {
  try {
    setLoading(true);
    const result = await fetchTopHeadlines('us');
    setArticles(result.articles);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    setLoading(false);
  }
};

// 3. Run on component mount
useEffect(() => {
  loadNews();
}, []);

// 4. Render list with pull-to-refresh
<FlatList
  data={articles}
  renderItem={({ item }) => (
    <NewsArticleCard 
      article={item}
      onPress={() => navigation.navigate('ArticleDetails', { article: item })}
    />
  )}
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={loadNews}
    />
  }
/>
```

## 🤝 Contributing

This is an educational project. Feel free to fork, modify, and enhance it!

## 📝 License

This project is open source and available for learning purposes.

## 💡 Tips for Learners

1. **Read Comments** - All code is heavily commented to explain concepts
2. **Experiment** - Try modifying colors, spacing, or adding new features
3. **Debug** - Use `console.log()` to inspect data
4. **Refer to Docs** - Check [React Native docs](https://reactnative.dev) for component details
5. **Ask Questions** - Don't hesitate to research unfamiliar concepts

---

Happy coding! 🚀

For more information:
- [React Native Documentation](https://reactnative.dev)
- [Expo Documentation](https://docs.expo.dev)
- [NewsAPI Documentation](https://newsapi.org/docs)
- [React Navigation](https://reactnavigation.org)
