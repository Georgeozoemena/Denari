# DENARI - Personal Finance App 💰

Your personal finance companion built with React Native and Expo.

## 🎨 Overview

DENARI is a modern personal finance management app that helps users track expenses, manage budgets, set savings goals, and gain insights into their spending habits. Built with Expo Router v57 and React Native, featuring a beautiful orange-themed UI with comprehensive dark mode support.

## ✨ Features

### Implemented ✅
- **Complete Authentication Flow**
  - Welcome/splash screen with branding
  - Sign up with social login (Google, Apple)
  - Login with PIN verification
  - OTP verification with timer
  - Password reset flow
  - Currency selection (NGN, USD, EUR, GBP)
  - Profile setup

- **Home Dashboard**
  - Balance overview with trends
  - Quick action shortcuts
  - Recent transactions feed
  - Budget progress tracking

- **Expense Management**
  - Add expense with categories
  - Amount and date tracking
  - Receipt attachment (UI ready)
  - Category-based organization

- **Design System**
  - Custom UI component library
  - Consistent theming
  - Dark mode support
  - Orange brand color (#FD7E15)

### Coming Soon 🚧
- Budget wizard (3-step flow)
- Analytics with charts
- Savings goals tracking
- Weekly review insights
- Notifications center
- Full profile & settings

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on specific platform
npm run ios      # iOS
npm run android  # Android
npm run web      # Web browser
```

### First Run
1. App opens to welcome screen
2. Tap "Get Started" to sign up
3. Complete onboarding flow
4. Access the home dashboard

## 📱 Screens

### Authentication (10 screens)
- Welcome
- Sign Up
- Login
- Forgot Password
- Verify OTP
- Setup PIN
- Enter PIN
- Choose Currency
- Profile Setup
- Success/Welcome

### Main App (6+ screens)
- Home Dashboard
- Transactions
- Add Expense (modal)
- Analytics
- Profile & Settings
- Budget Management

See **[SCREENS.md](./SCREENS.md)** for detailed documentation.

## 🎯 User Flows

### New User
```
Welcome → Sign Up → OTP → PIN → Currency → Profile → Success → Dashboard
```

### Returning User
```
Welcome → Login → Enter PIN → Dashboard
```

### Add Expense
```
Dashboard → Add Button → Category → Amount → Save → Dashboard
```

## 📚 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - Get started in 5 minutes
- **[SCREENS.md](./SCREENS.md)** - Complete screen documentation
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Technical details
- **[AGENTS.md](./AGENTS.md)** - Development guidelines

## 🏗️ Project Structure

```
src/
├── app/
│   ├── _layout.tsx              # Root navigation
│   ├── index.tsx                # Entry point
│   ├── (auth)/                  # Authentication screens
│   │   ├── welcome.tsx
│   │   ├── sign-up.tsx
│   │   ├── login.tsx
│   │   └── ...
│   ├── (tabs)/                  # Main app tabs
│   │   ├── index.tsx            # Home dashboard
│   │   ├── transactions.tsx
│   │   └── ...
│   └── add-expense.tsx          # Modal screens
├── components/
│   └── ui/                      # Reusable components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── social-button.tsx
└── constants/
    └── theme.ts                 # Design tokens
```

## 🎨 Design System

### Colors
- **Primary**: #FD7E15 (Orange)
- **Primary End**: #FE6901
- **Primary Soft**: #FFF0E6
- **Success**: #34C759
- **Error**: #FF3B30

### Typography
- **Title**: 28px, Bold (800)
- **Subtitle**: 16px, Regular (400)
- **Body**: 15px, Medium (500)
- **Caption**: 13px, Regular (400)

### Components
- Button (4 variants, 3 sizes)
- Input (with label & error)
- Card (3 variants)
- Social Button (Google, Apple)

## 🛠️ Tech Stack

- **Framework**: React Native
- **Runtime**: Expo SDK v57
- **Navigation**: Expo Router (file-based)
- **Language**: TypeScript
- **Styling**: StyleSheet API
- **State**: React Hooks

## 📊 Statistics

- **Screens**: 16 implemented
- **Components**: 4 custom UI components
- **Code Quality**: TypeScript, ESLint configured
- **Test Coverage**: Ready for testing setup

## 🤝 Contributing

This project follows Expo Router v57 conventions. See [AGENTS.md](./AGENTS.md) for development guidelines.

### Development Workflow
1. Create feature branch
2. Implement screen/component
3. Test on iOS/Android
4. Create pull request

## 📝 License

See [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- Expo team for amazing framework
- React Native community
- Design inspiration from modern fintech apps

## 📞 Support

For questions or issues:
- Check documentation files
- Review Expo Router v57 docs
- Open an issue on GitHub

---

**Built with ❤️ using Expo Router v57 and React Native**

*Take control of your money. Build a better tomorrow.* 🚀
