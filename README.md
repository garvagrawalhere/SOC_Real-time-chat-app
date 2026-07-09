# Real-Time Chat Application

A modern, real-time chat application built with React and Firebase.

## 🚀 Features

- **Authentication**: Secure Google Sign-In using Firebase Auth.
- **Real-time Messaging**: Instant messaging powered by Firestore `onSnapshot`.
- **Chat Rooms**: Dynamic room creation and navigation using React Router.
- **Presence Tracking**: Online/Offline status indicators via Firebase Realtime Database.
- **Typing Indicators**: Real-time "User is typing..." notifications.
- **Responsive UI**: Clean, modern interface with a professional color palette.

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router v6, CSS3
- **Backend**: Firebase (Auth, Firestore, Realtime Database)
- **Deployment**: Firebase Hosting

## 📦 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd SOC_Real-time-chat-app/react-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Firebase Configuration**
   Create a `src/firebase.js` file (or update the existing one) with your Firebase config:

   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID",
   };
   ```

4. **Run the application**
   ```bash
   npm start
   ```

## 🔐 Security Rules

To secure your app, apply these rules in your Firebase Console:

### Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /rooms/{roomId} {
      allow read, write: if request.auth != null;

      match /messages/{messageId} {
        allow read, write: if request.auth != null;
      }
    }
  }
}
```

### Realtime Database Rules

```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

## 🌐 Deployment

The app is deployed using Firebase Hosting.

```bash
npm run build
firebase deploy
```
