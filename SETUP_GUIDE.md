# 🚀 Step-by-Step Setup Guide for Beginners

This guide walks you through setting up the News App in Android Studio Emulator.

## ⏱️ Estimated Time: 15-20 minutes

---

## Step 1: Install Node.js

1. Go to [nodejs.org](https://nodejs.org)
2. Download **LTS (Long Term Support)** version
3. Run the installer and follow the prompts
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```

---

## Step 2: Install Expo CLI

Open terminal/command prompt and run:

```bash
npm install -g expo-cli
```

Verify installation:

```bash
expo --version
```

---

## Step 3: Set Up Android Studio & Emulator

### On Windows/Mac/Linux:

1. Download [Android Studio](https://developer.android.com/studio)
2. Install Android Studio
3. Launch Android Studio
4. Go to **Tools** → **AVD Manager** (Android Virtual Device Manager)
5. Click **Create Virtual Device**
   - Select **Pixel 5** (or any recent device)
   - Select **API Level 33** or higher
   - Click **Finish**

6. Click the **Play button** to start the emulator
7. Wait for the emulator to boot (may take 2-3 minutes on first launch)

---

## Step 4: Get NewsAPI Key

1. Visit [newsapi.org](https://newsapi.org)
2. Click **Get API Key** → **Register**
3. Fill in your email and password
4. After registration, you'll see your **API Key**
5. Copy it to clipboard

---

## Step 5: Clone/Navigate to Project

Navigate to the project folder:

```bash
cd /home/cynthia-tua/Desktop/CROSSPLATFORM/NewsApp
```

---

## Step 6: Install Dependencies

```bash
npm install
```

This downloads and installs all required packages. Wait for it to complete (may take 2-3 minutes).

---

## Step 7: Configure API Key

1. Open `src/utils/newsAPI.js` in VS Code
2. Find this line:
   ```javascript
   const API_KEY = 'YOUR_NEWS_API_KEY_HERE';
   ```
3. Replace it with your actual key:
   ```javascript
   const API_KEY = 'your_actual_key_from_newsapi_org';
   ```
4. Save the file (Ctrl+S or Cmd+S)

---

## Step 8: Start Development Server

In terminal, run:

```bash
npm start
```

You'll see:
```
› Using Expo Go
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)
› Press 'w' to open web
› Press 'a' to open Android
› Press 'i' to open iOS
› Press 'r' to reload
› Press 'c' to clear console
```

---

## Step 9: Run on Android Emulator

**Make sure your Android Emulator is running first!**

In the terminal, press `a`:

```
Press 'a' to open Android
```

Expo will:
1. Build the app
2. Install it on the emulator
3. Launch the app automatically

**Wait 30-60 seconds for the app to load.**

---

## Step 10: Test the App

Once the app appears in the emulator:

✅ **Test Pull-to-Refresh**
- Swipe down on the article list
- New articles should reload

✅ **Test Navigation**
- Tap on any article card
- You should see the full article details

✅ **Test External Link**
- On the details screen, tap "Read Full Article →"
- It should attempt to open in browser (may not work in emulator, but code is correct)

---

## 🎉 Success!

Your app is now running! Here's what you can do next:

### Explore the Code
- Open `src/screens/HomeScreen.js` - Main feed logic
- Open `src/components/NewsArticleCard.js` - Card component
- Open `src/utils/constants.js` - App colors and spacing

### Make Changes
- Change colors in `src/utils/constants.js`
- Modify article titles in `NewsArticleCard.js`
- Save files - the app will auto-reload!

### Debug
- Press `d` in terminal to open debug menu
- Use `console.log()` to log values
- Check terminal for error messages

---

## ❓ FAQ & Troubleshooting

### "Command not found: expo"
**Solution**: Restart your terminal after installing Expo CLI

### "Android Emulator won't start"
**Solution**: 
1. Open Android Studio
2. Go to AVD Manager
3. Click Play button on your device

### "Module not found error"
**Solution**:
```bash
rm -rf node_modules
npm install
```

### "No articles showing"
**Solution**:
1. Check API key is correct in `newsAPI.js`
2. Check internet connection
3. Visit newsapi.org to verify account is active

### "App keeps crashing"
**Solution**:
1. Check console for error messages (press `e` in terminal)
2. Try clearing cache: `expo start -c`
3. Check that you installed all dependencies: `npm install`

### "App is slow / not responding"
**Solution**:
1. Emulator needs more RAM - restart it
2. Check internet connection
3. Try pressing `r` to reload the app

---

## 📞 Getting Help

1. **Check the README.md** for more info
2. **Review code comments** - All code is well documented
3. **Check terminal output** - Errors are logged here
4. **React Native docs**: https://reactnative.dev
5. **Expo docs**: https://docs.expo.dev

---

## 🎓 Learning Tips

1. **Don't just run it** - Read the code and understand what's happening
2. **Make small changes** - Modify colors, text, spacing
3. **Use console.log** - Log values to understand data flow
4. **Try breaking it** - Change code to see what breaks
5. **Comment everything** - Write comments as you learn

---

## Next Steps

After you successfully run the app:

1. ✅ Explore the folder structure
2. ✅ Read through the code comments
3. ✅ Try changing colors and spacing
4. ✅ Try adding a new feature (search, favorites, etc.)
5. ✅ Share your modifications!

---

Happy coding! 🚀
