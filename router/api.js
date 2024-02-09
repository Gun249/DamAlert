const express = require('express'); // ใช้ express ในการเชื่อมต่อ server และ client
const router = express.Router();
const axios = require('axios'); // ใช้ axios ในการดึงข้อมูลจาก api
const fs = require('fs'); // ใช้ fs ในการอ่านไฟล์
const {weather} = require('../models/Weather');
const appid = '66ee8028f68dfce6f42f1552564adc11';
const cron = require('node-cron');


router.get('/dam',async (req, res) => {
    const locate = require('../map/locate.json');
    try{    
        const { data } = await axios.get("https://app.rid.go.th/reservoir/api/dam/public"); // ดึงข้อมูลจาก api โดยใช้ axios
        // res.send(data); // ส่งข้อมูลกลับไปยัง client
        const locateData = data;
        const newData = [];
        for(const i in data.data){
            const iData = data.data[i];
            // console.log(iData.region);
            const region = iData.region;
            newData[i] = {
                region: region,
                dam: []
            }
            // newData[i];
            // newData[i].region = iData.region;
            for(const dam of iData.dam) {
                const find = locate.find((item) => item.id === dam.id);
                if(find){
                    dam.lat = find.latitude;
                    dam.lng = find.longitude;
                    dam.province = find.province;
                    dam.region = find.region;
                }
                newData[i].dam.push(dam);
            }
        }
        data.data = newData;

        res.send(newData);
        // res.send(newData);
    }
    catch(error){
        console.log(error); // แสดง error ใน console
        res.status(500).send("Internal Server Error"); // ส่ง error 500 กลับไปยัง client
    }
});
const path = require('path');

router.get('/rain', async (req, res) => {
    try{
        const weatherdata = await weather.find();
        res.send(weatherdata);
    }

     catch(error){
        console.log(error);
    }
});

router.post('/test', async (req, res) => {
    const locations = [ { lat: 18.924875160076116, lon: 99.12266322806133 }, {lat:18.52344284300219, lon: 99.62560355263315 } , {lat: 18.809254588395685 , lon: 99.64294322934713 } , {lat: 17.189584177366743 , lon: 100.42160001638017 } , {lat: 17.324265983811234,lon:99.41126708215302},{lat:17.242694628017123 , lon:98.97268331056529},{lat:17.764062677298583 , lon:100.56359048755601},
        {lat:19.175241730573095,lon:99.03423685564},{lat: 17.369525355890246 ,lon: 102.62022567641446 },{lat:17.309185336272172,lon:103.7430287433701},{lat: 16.60235987598631 , lon:103.44146131403791,},{lat:14.865217750798084,lon:101.56058913168101},{lat:14.505516883391001,lon:101.78087786051069},{lat:14.483795743223821,lon:102.14764393352284},
        {lat:14.402613895151704,lon:102.24924087404906},{lat:14.300152011817762,lon:102.760262627293},{lat:16.978103714309814,lon:103.9731070183201},{lat:16.535659057019267,lon:101.64974556054497},{lat:16.775605934195433,lon:102.61898275731708},{lat:15.205624224129815,lon:105.43011042244777},{lat:14.866406314737441,lon:101.05999133758326},{lat:15.540691006494155,lon:99.43310208139135},
        {lat:14.840408139745358,lon:99.67146616154585},{lat:14.410877917568946,lon:99.1249846939014},{lat:14.830886930090456,lon:98.68765885442677},{lat:14.314203092174996,lon:101.32160605560233},{lat:13.433985308754838,lon:101.65128060980906},{lat:13.205243432600728,lon:100.97726347863085},{lat:12.946599904635278,lon:101.26522390317758},{lat:12.98542875727285, lon:101.56235843828713},{lat:14.075240787362631,lon:102.03218429393267},
        {lat:12.457276117910444,lon:99.79422001453311},{lat:12.914894575420938,lon:99.62760708336137},{lat:8.972541376396636,lon:98.8060051027748},{lat: 6.157523473115944,lon:101.27083039729656}]


        cron.schedule('0 * * * *', async () => {
            try {
              for (const location of locations) {
                const { lat, lon } = location;
                await weather.deleteMany({ coord: { lat, lon } });
          
                const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}&units=metric&lang=th`);
                const weatherData = weatherResponse.data;
                
                if (weatherData.rain) {
                  weatherData.rain = weatherData.rain['1h'] || 0; 
                } else {
                  weatherData.rain = 0; 
                }
          
                await weather.updateOne({ coord: { lat, lon } }, weatherData, { upsert: true });
              }
          
              console.log('Weather data updated:', new Date());
            } catch (error) {
              console.error('Error updating weather data:', error);
            }
          });
});


        

module.exports = router;