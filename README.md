# 🌦️ Weather Deck

A modern and responsive weather dashboard built with React and Tailwind CSS that provides real-time weather updates, hourly forecasts, weekly forecasts, air quality information, and detailed weather insights in a clean and interactive UI.

---

## 📌 Project Overview

Weather Deck is a feature-rich weather application designed to deliver accurate and visually appealing weather information for cities around the world. The application offers current weather conditions, forecast data, AQI information, astronomy details, and multiple utility features with a smooth user experience across all devices.

The project focuses on modern frontend development practices using React, Redux Toolkit, Tailwind CSS, and Weather APIs.

---

## ✨ Features

* 🌍 Search weather by city name
* 📍 Real-time current weather data
* 🌡️ Temperature, feels-like, humidity, pressure, and wind details
* 🕒 Hourly weather forecast
* 📅 7-day weather forecast
* 🌅 Sunrise and sunset tracking
* 🌬️ Air Quality Index (AQI) information
* 🌗 Dynamic weather icons and conditions
* 🌓 Dark/Light mode support
* 💾 Saved cities functionality
* 📱 Fully responsive modern UI
* ⚡ Fast performance with optimized state management
* 🎨 Clean and interactive user interface

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Redux Toolkit
* Tailwind CSS
* JavaScript (ES6+)
* React Icons
* Recharts
* Local Storage

### APIs

* WeatherAPI.com API
* api-ninjas.cam

### Build Tools

* Vite
* npm

---

## 📂 Folder Structure

```bash
Weather-Deck/
│
├── public/
├── src/
│   ├── app/
│   ├── components/
│   ├── features/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
│   ├── App.css
│   └── index.css
│
├── .env
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add the following:

```env
VITE_WEATHER_API_KEY=your_api_key_here
VITE_CITY_API_KEY=your_api_key_here
```

> Replace `your_api_key_here` with your WeatherAPI API key and City API key.

---

## 🔌 API Usage

This project uses the WeatherAPI service for fetching weather and forecast data.

### Example Endpoint

```bash
https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=London&days=7
https://api.api-ninjas.com/v1/city?name=city_name
```

### API Features Used

* Auto City Suggestions in Searchbar using Debouncing
* Current Weather
* Forecast Weather
* Hourly Forecast
* Air Quality Index
* Astronomy Data

Get your API keys from:

https://www.weatherapi.com/
and 
https://api-ninjas.com/

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/faraz-pk/Weather-Deck.git
```

### 2️⃣ Navigate to the Project Directory

```bash
cd Weather-Deck
```

### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Add Environment Variables

Create a `.env` file and add your Weather API key.

### 5️⃣ Start Development Server

```bash
npm run dev
```

The app will run on:

```bash
http://localhost:5173
```

---

## 📜 Available Scripts

| Command           | Description               |
| ----------------- | ------------------------- |
| `npm run dev`     | Starts development server |
| `npm run build`   | Builds app for production |
| `npm run preview` | Preview production build  |
| `npm run lint`    | Run ESLint                |

---

## 🤝 Contribution Guide

Contributions are welcome!

### Steps to Contribute

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to your branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Developed by Faraz Rasheed

GitHub: https://github.com/faraz-pk

---

## ⭐ Support

If you like this project, consider giving it a star on GitHub ⭐
