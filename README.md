# DamAlert - Real-time Dam Water Level Monitoring System

## Overview
DamAlert is a real-time monitoring system designed to provide timely alerts regarding dam water levels. The system helps inform residents and authorities when water levels reach critical thresholds, allowing for early evacuation and flood preparedness.

## Features
- **Real-time tracking** of water levels across multiple dams.
- **Interactive map** displaying dam locations and current water levels.
- **Automated alerts** when water levels exceed critical thresholds.
- **User-friendly interface** with EJS templating and Bootstrap styling.
- **API integration** with OpenWeather API
- **REST API support** for external data access.

## Tech Stack
### **Frontend**
- **Templating Engine:** EJS (Embedded JavaScript)
- **CSS Framework:** Bootstrap 5

### **Backend**
- **Server:** Node.js, Express.js
- **Database:** MongoDB
- **API Integration:** OpenWeather API
- **Development Tools:** Git, Postman

## Getting Started
```bash
1. Clone the Repository

git clone https://github.com/Gun249/DamAlert.git
cd DamAlert

2. Install Dependencies
npm install

3.Configure Environment Variables
PORT=5000
MONGO_URI=your_mongodb_connection_string
OPENWEATHER_API_KEY=your_api_key
THAIWATER_API_KEY=your_api_key

4. Run the Server
npm start

