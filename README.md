# TripCraft v2 — Final Build Documentation

**TripCraft** is a unified, full-stack travel intelligence and booking platform designed for **Subject 23CS54C**, **National Engineering College, Kovilpatti**.

TripCraft v2 features a clean vanilla HTML/CSS/JS architecture on the client with CSS design tokens, dynamic dark mode, 6 customizable palette themes, multi-language internationalization (English, தமிழ், हिन्दी), Google Sign-In (OAuth), and a dedicated Node.js/Express notification server supporting Email (SMTP), SMS, and WhatsApp alerts.

---

## 🚀 Quick Start Guide

> [!IMPORTANT]
> Always run the platform through the Express server so that static files, REST APIs, and OAuth origins align on `http://localhost:3000`. Do **not** open the HTML files directly via `file://`.

```bash
# 1. Navigate to the server directory
cd server

# 2. Install backend dependencies (Express, Nodemailer, Twilio, Dotenv)
npm install

# 3. Create your environment configuration
cp .env.example .env

# 4. Start the TripCraft v2 server
npm start
```

Now open **`http://localhost:3000`** in any modern web browser.

---

## 🔑 External Services & API Configuration

| Provider | Purpose | Environment Variables | How to Obtain / Configure |
| :--- | :--- | :--- | :--- |
| **Google Identity (OAuth)** | One-click Google Sign-In | `tc-config.js` (`googleClientId`) | 1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials).<br>2. Create **OAuth 2.0 Client ID** (Application type: **Web application**).<br>3. Add Authorized JavaScript origin: `http://localhost:3000`.<br>4. Paste client ID into `tc-config.js`. |
| **Gmail (SMTP via Nodemailer)** | Booking confirmations, OTP emails & invoices | `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM` | 1. Enable 2-Step Verification on your Google account.<br>2. Visit [Google App Passwords](https://myaccount.google.com/apppasswords).<br>3. Generate a 16-letter App Password for "TripCraft".<br>4. Set `SMTP_PASS` in `server/.env`. |
| **Twilio SMS** | Verification OTPs & critical trip alerts | `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_SMS_FROM` | 1. Sign up at [Twilio Console](https://console.twilio.com/).<br>2. Obtain Account SID & Auth Token from dashboard.<br>3. Obtain a Twilio phone number in E.164 format (e.g. `+1234567890`). |
| **Twilio WhatsApp** | Digital boarding passes & concierge updates | `TWILIO_WHATSAPP_FROM` | 1. Enable Twilio WhatsApp Sandbox in console.<br>2. Send join phrase from recipient phone to the sandbox number.<br>3. Set `TWILIO_WHATSAPP_FROM=whatsapp:+14155238886`. |

*Note: If email or Twilio services are not configured in `.env`, TripCraft automatically operates in **Demo Testing Mode**, displaying OTP codes securely on the interface without throwing errors.*

---

## 🇮🇳 தமிழ் வழிகாட்டி (Tamil Setup Instructions)

### 1. Google OAuth Sign-in API அமைப்பது எப்படி?
1. **Google Cloud Console** ([console.cloud.google.com](https://console.cloud.google.com/)) செல்லவும்.
2. புதிய திட்டம் (Project) உருவாக்கி, **APIs & Services > Credentials** பகுதிக்கு செல்லவும்.
3. **Create Credentials > OAuth client ID** என்பதை கிளிக் செய்யவும்.
4. **Application type**-ல் **Web application** என்பதை தேர்ந்தெடுக்கவும்.
5. **Authorized JavaScript origins**-ல் `http://localhost:3000` என உள்ளிடவும்.
6. இறுதியாக கிடைக்கும் **Client ID**-ஐ நகலெடுத்து, உங்கள் திட்டத்தில் உள்ள `tc-config.js` கோப்பில் `googleClientId` என்ற இடத்தில் உள்ளிடவும்:
   ```javascript
   window.TC_CONFIG = {
     googleClientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
     apiBase: ''
   };
   ```

### 2. Email API (Gmail SMTP / Nodemailer) அமைப்பது எப்படி?
1. உங்கள் கூகிள் கணக்கில் **2-Step Verification** இயக்கப்பட்டிருக்க வேண்டும்.
2. [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) பக்கத்திற்கு சென்று, "TripCraft" என்ற பெயரில் ஒரு புதிய **App Password** (16 எழுத்துகள்) உருவாக்கவும்.
3. `server/.env` கோப்பில்:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=xxxx xxxx xxxx xxxx
   MAIL_FROM="TripCraft <your_email@gmail.com>"
   ```
   என அமைத்தால் முன்பதிவு ரசீதுகள் மற்றும் OTP மின்னஞ்சலில் தானாக வந்து சேரும்.

### 3. SMS மற்றும் WhatsApp API (Twilio) அமைப்பது எப்படி?
1. [twilio.com](https://www.twilio.com/) இணையதளத்தில் கணக்கு தொடங்கவும்.
2. டாஷ்போர்டில் உள்ள **Account SID** மற்றும் **Auth Token**-ஐ பெறவும்.
3. SMS-க்கு ஒதுக்கப்பட்ட எண்ணை `TWILIO_SMS_FROM` ஆகவும், WhatsApp Sandbox எண்ணை `TWILIO_WHATSAPP_FROM=whatsapp:+14155238886` எனவும் `server/.env` கோப்பில் உள்ளிடவும்.

---

## 🎨 What Changed in TripCraft v2

1. **Syntax Fix in `shared.js`**: Fixed the missing comma prior to `// Community Posts`, restoring search, booking modals, and auth across all pages.
2. **"Jaipur Blue & Marigold" Design System**:
   - Primary navy `#101B4B`, accent blue `#2447E0`, warm marigold `#F6A91B`.
   - 6 user-switchable color palettes (`cobalt`, `teal`, `green`, `orange`, `rose`, `purple`).
   - Integrated dark mode (`html.dark`) with high-contrast surfaces and persistent local storage.
3. **Responsive Engine**: Down to 390px with zero horizontal scroll overflow (`document.documentElement.scrollWidth === 390`). Includes responsive drawer navigation and collapsible data grids.
4. **Unified Dynamic Client Layer (`tc-layer.js`)**:
   - Single-source injection of desktop and mobile navigation with "More" dropdown.
   - Comprehensive footer with institutional metadata and quick links.
   - Complete tri-lingual support (English, தமிழ், हिन्दी) updating buttons, hero text, and placeholders.
5. **Secure Authentication & Account Security**:
   - SHA-256 client-side cryptographic hashing.
   - Removed all legacy mock badges and labels (JWT, OAuth 2.0, GitHub, 1-Click login).
   - Seamless Google Sign-In with official Google Identity Services (GIS) integration and authentic account picker modal.
6. **New Pages**:
   - `signup.html`: 2-step verification flow with password strength meter, 6-digit OTP auto-advance, and demo fallback.
   - `settings.html`: User preferences hub for dark mode, palette swatches, language switcher, notification toggles with live test message, and account state.
   - `login.html`: Completely rewritten into clean 2-column layout with forgot password reset flow.
7. **Node.js Express Backend (`/server`)**:
   - `/api/health`: Provider availability health checks.
   - `/api/notify`: Multi-channel notification dispatcher (Email, SMS, WhatsApp).
   - `/api/otp/send` & `/api/otp/verify`: Secure 6-digit OTP engine with SHA-256 hashing, 5-minute expiry, and attempt limits.
   - Static asset server binding the root directory.

---

## 🧪 Acceptance Verification

- [x] `node --check` passes on `shared.js`, `tc-config.js`, `tc-layer.js`, `server/server.js`.
- [x] All 22 inline scripts across 31 HTML files pass syntax verification.
- [x] Zero viewport overflow at 390px mobile viewport.
- [x] Google Sign-In with authentic account selector.
- [x] Email, SMS, and WhatsApp notification hooks.
- [x] Complete institutional alignment with **Subject 23CS54C**, **National Engineering College, Kovilpatti**.
