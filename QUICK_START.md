# DENARI - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

```bash
# Navigate to project directory
cd /Users/mac/Documents/Denari

# Install dependencies
npm install

# Start development server
npm start
```

## 📱 Testing the App

### Option 1: iOS Simulator (Mac only)
```bash
npm run ios
```

### Option 2: Android Emulator
```bash
npm run android
```

### Option 3: Web Browser
```bash
npm run web
```

### Option 4: Physical Device
1. Install Expo Go app on your phone
2. Scan the QR code from terminal
3. App will load on your device

## 🎯 Testing User Flows

### Flow 1: New User Registration
1. App opens to Welcome screen (orange background)
2. Tap "Get Started"
3. Fill in Sign Up form
4. Enter OTP (any 6 digits for demo)
5. Create 4-digit PIN
6. Choose currency (default: NGN)
7. Complete profile
8. View success screen
9. Tap "Go to Dashboard"

### Flow 2: Returning User Login
1. From Welcome screen, tap "Log In"
2. Enter email/phone and password
3. Enter PIN (any 4 digits for demo)
4. Access Home Dashboard

### Flow 3: Add Expense
1. From Home Dashboard, tap Quick Action
2. Or navigate to Add tab
3. Enter amount
4. Select category
5. Add description
6. Save expense

## 🎨 Screen Navigation Map

```
Welcome Screen
├─→ Sign Up
│   └─→ Verify OTP
│       └─→ Setup PIN
│           └─→ Choose Currency
│               └─→ Profile Setup
│                   └─→ Success
│                       └─→ Home Dashboard
│
└─→ Login
    └─→ Enter PIN
        └─→ Home Dashboard

Home Dashboard (Tabs)
├─→ Home (default)
├─→ Transactions
├─→ Add (center button)
├─→ Analytics
└─→ Profile
```

## 🔍 Key Features to Test

### Authentication
- ✅ Welcome screen loads with orange background
- ✅ Sign up form validates inputs
- ✅ OTP inputs auto-focus between boxes
- ✅ OTP timer counts down from 30 seconds
- ✅ PIN keyboard on orange background
- ✅ Currency selection with checkmarks
- ✅ Profile setup with avatar placeholder

### Dashboard
- ✅ Balance card displays prominently
- ✅ Quick actions are tappable
- ✅ Recent transactions list scrolls
- ✅ Budget progress bar shows
- ✅ Tab navigation works smoothly

### Add Expense
- ✅ Modal presentation
- ✅ Amount input with currency symbol
- ✅ Category cards are selectable
- ✅ Date input works
- ✅ Close button returns to previous screen

## 🎨 Design Verification

### Color Check
- Primary orange: #FD7E15 ✅
- Used in buttons, highlights, PIN screen
- Consistent throughout app

### Typography Check
- Headers: Bold, clear hierarchy ✅
- Body text: Readable size ✅
- Input text: Proper sizing ✅

### Layout Check
- Proper spacing: 16-24px margins ✅
- Rounded corners: 16-24px radius ✅
- Card shadows: Subtle elevation ✅

## 🐛 Known Limitations (Demo)

These are intentional for the demo/prototype:

1. **Authentication**: No real backend
   - Any email/password works
   - OTP accepts any 6 digits
   - PIN accepts any 4 digits

2. **Data Persistence**: No storage
   - Data resets on app restart
   - No real transactions saved
   - No budget tracking yet

3. **Social Login**: UI only
   - Google/Apple buttons don't authenticate
   - Just visual implementation

4. **Charts**: Not implemented yet
   - Analytics screen is placeholder
   - Budget charts pending

## 🔧 Troubleshooting

### Issue: App won't start
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npm start -- --clear
```

### Issue: Styles not showing
```bash
# Make sure global.css is imported
# Check src/app/_layout.tsx has '../global.css'
```

### Issue: Navigation not working
```bash
# Verify Expo Router is installed
npm list expo-router
# Should show ~57.0.10
```

### Issue: TypeScript errors
```bash
# Rebuild types
npm run lint
```

## 📚 File Structure Reference

```
Key Files to Know:
├── src/app/_layout.tsx          # Root navigation setup
├── src/app/index.tsx            # Entry point/auth check
├── src/app/(auth)/              # All auth screens
├── src/app/(tabs)/              # Main app tabs
├── src/components/ui/           # Reusable components
└── src/constants/theme.ts       # Design tokens
```

## 🎯 Development Tips

### Making Changes

1. **Edit a screen**: Changes hot-reload automatically
2. **Add a new screen**: Create file in `src/app/`
3. **Update theme**: Edit `src/constants/theme.ts`
4. **Create component**: Add to `src/components/ui/`

### Testing on Multiple Devices

```bash
# The QR code shown in terminal works on:
- iOS devices (via Expo Go)
- Android devices (via Expo Go)
- Web browsers (localhost URL)
```

### Code Organization

- Each screen is self-contained
- Styles defined at bottom of file
- Components imported from `@/components`
- Theme colors from `@/constants/theme`

## 📖 Documentation

- **SCREENS.md**: Detailed screen documentation
- **IMPLEMENTATION_SUMMARY.md**: Technical overview
- **AGENTS.md**: Development guidelines
- **README.md**: Project introduction

## ✨ Next Steps

1. **Test all flows**: Go through each screen
2. **Check dark mode**: Toggle device theme
3. **Test on device**: Install Expo Go
4. **Review code**: Understand structure
5. **Plan features**: Check IMPLEMENTATION_SUMMARY.md

## 🎉 You're Ready!

The app is fully functional for demonstration purposes. All screens are implemented with the designs you provided. Test it out and enjoy! 🚀

---

**Happy Testing!** 🎊

If you encounter any issues, check the troubleshooting section or review the implementation files.
