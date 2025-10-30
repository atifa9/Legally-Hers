
# 💼 LegallyHers – AI-Powered Legal Advisor for Women

**LegallyHers** is a mobile-first application that empowers women by providing real-time legal advice, rights awareness, and actionable guidance using AI. It is designed to assist users in navigating sensitive situations like workplace harassment, domestic violence, and gender-based discrimination.

> ⚖️ **Built during a hackathon with the mission to democratize legal knowledge for women.**

---

## 🔗 Table of Contents

- [🚀 Features](#-features)
- [🪙 Premium Features](#-Premium-features)
- [🛠 Tech Stack](#-tech-stack)
- [🔐 Authentication & Security](#-authentication--security)
- [🧠 AI Integration](#-ai-integration)
- [📦 Project Structure](#-project-structure)
- [🔧 Setup Instructions](#-setup-instructions)
- [📱 UI/UX Highlights](#-uiux-highlights)
- [🎯 Vision & Impact](#-vision--impact)
- [🤝 Team & Collaboration](#-team--collaboration)

---

## 🚀 Features

- 🤖 AI chatbot offering legal advice powered by GPT-3.5
- 🗃 Save and revisit conversation history
- 🔐 Secure JWT-based login/signup
- 📚 View curated rights and legal actions
- 🔍 Minimalistic, mobile-first UI with a bold dark theme
- 📅 Conversations grouped by date
- 🌍 Ready for future localization and voice features

 ## 🪙 Premium Features

> Unlock enhanced legal empowerment with premium tools designed for critical real-life situations.

* 👩‍⚖️ **Consult a Lawyer** – Schedule one-on-one virtual consultations with verified legal experts for personalized legal advice.
* 🧾 **Store Evidence Securely** – Upload and securely store sensitive **photos and videos** related to your case, encrypted and accessible only to you.
* 🧑‍💼 **Connect with Advocates** – Get matched with local, verified advocates based on your legal needs and location, with options for follow-up support.
* 🛡️ **Enhanced Data Privacy** – Advanced encryption and secure storage protocols to ensure your legal data stays private.


---

## 🛠 Tech Stack

### Frontend (React Native + Expo)

- `react-native`, `expo` – Cross-platform mobile development
- `react-navigation` – Screen navigation
- `jwt-decode` – Decode JWT for user sessions
- `react-native-dotenv` – Manage environment variables

### Backend (Node.js + Express)

- `express` – RESTful API framework
- `mongoose` – MongoDB object modeling
- `bcryptjs` – Secure password hashing
- `jsonwebtoken` – JWT authentication
- `dotenv` – Secure environment configuration
- `openai` – Chatbot integration using GPT-3.5
- `cors`, `nodemon`, `ngrok` – Dev tools

### Database

- **MongoDB Atlas** – Cloud-hosted NoSQL database
- Schema: Users, Conversations (with timestamps and messages)

---

## 🔐 Authentication & Security

- JWT tokens used for authenticating API routes
- Passwords hashed using bcrypt before storage
- Chat history is accessible only to authenticated users
- Middleware validates tokens before any sensitive operation

---

## 🧠 AI Integration

- **Model Used**: OpenAI GPT-3.5
- **Purpose**: Provide legal information in simple, empathetic, and context-aware language
- **Prompting**: System-level prompts align the chatbot with Indian legal advisory tone

---

## 📦 Project Structure

```
legallyhers/
├── legallyhers-frontend/        # React Native Expo App
│   ├── App.js
│   ├── screens/
│   ├── components/
│   ├── assets/
│   └── .env
├── legallyhers-backend/         # Node.js + Express Backend
│   ├── server.js
│   ├── routes/
│   ├── models/
│   ├── middleware/

```

---

## 🔧 Setup Instructions

### 1. Prerequisites

- Node.js v16+
- Expo CLI
- MongoDB Atlas account
- OpenAI API key

---

### 2. Frontend Setup

```bash
# Install Expo CLI globally
npm install -g expo-cli
# Clone the project and navigate to frontend
cd legallyhers-frontend
npm install

# Start development server
npm start
```
install Expo go on your phone
Open the Expo Go app on your phone and scan the QR code to preview.
---

### 3. Backend Setup

```bash
# Navigate to backend
cd legallyhers-backend
npm install

# Create .env file
touch .env
```

**`.env` Example:**
```
OPENAI_API_KEY=your_openai_key
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongodb_connection_string
```

```bash
# Start the server
node server.js

# to run app in your phone using expo go app from playstore: type in terminal:
npx expo start
scan the qr code using your mobile.

```
Change IP address to your own IP address.
---

## 📱 UI/UX Highlights

- **Bold, dark-themed design** for accessibility
- **Simple user flow**: Login → Chat → Save/View History
- **Guest mode** available for quick access
- **No clutter**, no ads—only focused legal help
- **Large fonts** and standout buttons for emergency use

---

## 🎯 Vision & Impact

### 🎯 Target Audience
- Women, especially in rural or underserved areas
- Students, homemakers, working professionals

### 💡 Impact
- Immediate, 24/7 legal help without needing a lawyer
- Encourages legal literacy and self-advocacy
- Lays the groundwork for scalable legal tech solutions

### 🔮 Future Plans

- 🗣️ Multilingual support (Hindi, Tamil, Telugu)
- 🎤 Text-to-speech for accessibility
- 🚨 SOS button for emergencies
- 🧑‍💻 Admin panel for updating laws dynamically
- 📴 Offline content for rural regions

---









