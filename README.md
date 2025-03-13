#  DamAlert - ระบบแจ้งเตือนระดับน้ำในเขื่อนแบบเรียลไทม์ 🌊

DamAlert เป็นระบบที่ช่วยแจ้งเตือนประชาชนเกี่ยวกับระดับน้ำในเขื่อนแบบ **Real-time**  
เมื่อระดับน้ำถึงจุดวิกฤติ ระบบจะแสดงการแจ้งเตือนเพื่อให้ประชาชนเตรียมตัวรับมือกับสถานการณ์น้ำท่วมที่อาจเกิดขึ้น  

---

## ** Features (คุณสมบัติหลัก)**
✅ ตรวจสอบระดับน้ำในเขื่อนทั่วประเทศ  
✅ แสดงแผนที่แบบ Interactive พร้อมตำแหน่งเขื่อนและระดับน้ำ  
✅ แจ้งเตือนเมื่อระดับน้ำถึงจุดวิกฤติ  
✅ เชื่อมต่อกับ **OpenWeather API** 
✅ รองรับ **REST API** สำหรับเรียกข้อมูล  

---

## **🛠 Tech Stack (เทคโนโลยีที่ใช้)**
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **API Integration:** OpenWeather API, ThaiWater API  
- **Other Tools:** Git, Postman, Docker (ถ้ามีนายใช้)  

---

## ** Getting Started (เริ่มต้นใช้งาน)**  

### **1️ Clone Repository**
```bash
git clone https://github.com/Gun249/DamAlert.git
cd DamAlert

2. ติดตั้ง Dependencies
npm install

3. ตั้งค่าไฟล์ .env
PORT=5000
MONGO_URI=your_mongodb_connection_string
OPENWEATHER_API_KEY=your_api_key
THAIWATER_API_KEY=your_api_key

รันเซิร์ฟเวอร์
npm start

