
function datadam(rainArray){ 
    const unit = "ล้านลูกบาศก์เมตร"
    axios({
        method: 'get',
        url: 'http://localhost:3000/api/dam'
    })
    .then(function (response) {
        
        
        const data = response.data; // ดึงข้อมูลจาก response.data.data
        const namedamArray = []; // สร้าง array เพื่อเก็บชื่อเขื่อน
        const regionArray = []; // สร้าง array เพื่อเก็บภูมิภาค
        const storageArray = []; // สร้าง array เพื่อเก็บปริมาณที่กักเก็บ
        const capacityArray = []; // สร้าง array เพื่อเก็บปริมาณที่กักเก็บสูงสุด
        const ownerArray = []; // สร้าง array เพื่อเก็บเจ้าของเขื่อน
        const active_storageArray = []; // สร้าง array เพื่อเก็บปริมาณน้ำที่ใช้ได้
        const dead_storageArray = []; // สร้าง array เพื่อเก็บปริมาณน้ำที่ใช้ไม่ได้
        const volumeArray = []; // สร้าง array เพื่อเก็บปริมาณน้ำในเขื่อน
        const percent_storageArray = []; // สร้าง array เพื่อเก็บเปอร์เซ็นต์ปริมาณน้ำที่ใช้ได้
        const provinceArray = []; // สร้าง array เพื่อเก็บจังหวัด
        const latitudeArray = []; // สร้าง array เพื่อเก็บละติจูด
        const longitudeArray = []; // สร้าง array เพื่อเก็บลองติจูด


        data.forEach(region => { // วนลูปเพื่อดึงข้อมูลภูมิภาค
            region.dam.forEach(dam => { // วนลูปเพื่อดึงข้อมูลเขื่อน
                namedamArray.push(dam.name); // เพิ่มชื่อเขื่อนลงใน array
                storageArray.push(dam.storage); // เพิ่มปริมาณที่กักเก็บลงใน array
                capacityArray.push(dam.capacity); // เพิ่มปริมาณที่กักเก็บสูงสุดลงใน array
                ownerArray.push(dam.owner); // เพิ่มเจ้าของเขื่อนลงใน array
                active_storageArray.push(dam.active_storage); // เพิ่มปริมาณน้ำที่ใช้ได้ลงใน array
                dead_storageArray.push(dam.dead_storage); // เพิ่มปริมาณน้ำที่ใช้ไม่ได้ลงใน array
                volumeArray.push(dam.volume); 
                percent_storageArray.push(dam.percent_storage);
                provinceArray.push(dam.province);
                latitudeArray.push(dam.lat);
                longitudeArray.push(dam.lng); 
                
                regionArray.push(dam.region);    
            });
        console.log(namedamArray);
            
        });
        init(namedamArray,storageArray,capacityArray,ownerArray,active_storageArray,dead_storageArray,volumeArray,percent_storageArray,longitudeArray,provinceArray,latitudeArray,regionArray,rainArray); // เรียกใช้ฟังก์ชัน init
        detaildam(namedamArray,storageArray,capacityArray,ownerArray,active_storageArray,dead_storageArray,volumeArray);
    });
    
}


function init(namedamArray,storageArray,capacityArray,ownerArray,active_storageArray,dead_storageArray,volumeArray,percent_storageArray,longitudeArray,provinceArray,latitudeArray,regionArray,rainArray) { // ฟังก์ชัน init สำหรับแสดงผลข้อมูล
    // พิกัดเขื่อน
    var detailTextarray = []
    var map = new longdo.Map({ // สร้างแผนที่
        placeholder: document.getElementById('map') // กำหนดตำแหน่งที่แสดงแผนที่
    });    
    
    for(var i = 0; i < longitudeArray.length; i++){
        var detailText = `เจ้าของ : ${ownerArray[i]} <br> ปริมาณที่กักเก็บ : ${storageArray[i]} ล้านลูกบาศก์เมตร<br> 
        ปริมาณที่กักเก็บสูงสุด : ${capacityArray[i]} ล้านลูกบาศก์เมตร<br>
        ปริมาณน้ำที่ใช้ได้ : ${active_storageArray[i]} ล้านลูกบาศก์เมตร<br>
        ปริมาณน้ำที่ใช้ไม่ได้ : ${dead_storageArray[i]} ล้านลูกบาศก์เมตร<br>
        ปริมาณน้ำในเขื่อน : ${volumeArray[i]} ล้านลูกบาศก์เมตร<br>
        เปอร์เซนต์ปริมาณน้ำต่อปริมาณกักเก็บ: ${percent_storageArray[i]} % <br>
        ปริมาตรฝน ${rainArray[i]} มม.`;
        detailTextarray.push(detailText)
    }
    
    createmaker(map,namedamArray,detailTextarray,longitudeArray,provinceArray,latitudeArray,regionArray,percent_storageArray,rainArray);
}
function createmaker(map,namedamArray,detailTextarray,longitudeArray,provinceArray,latitudeArray,regionArray,percent_storageArray,rainArray){
    var iconurl = '';
        for (var i = 0; i < longitudeArray.length; i++) {
        if (rainArray[i] >= 0 && rainArray[i] <= 10) {
            iconurl = '../images/ปักหมุดสีฟ้า.png'
        } else if (rainArray[i] > 10 && rainArray[i] <= 35) {
            iconurl = '../images/ปักหมุดสีเขียว.png'
        } else if (rainArray[i] > 35 && rainArray[i] <= 90) {
            iconurl = '../images/ปักหมุดสีเหลือง.png'
        } else if (rainArray[i] > 90) {
            iconurl = '../images/ปักหมุดสีแดง.png'
        }
    }
    

    for(var i = 0; i < longitudeArray.length; i++){
        var marker = new longdo.Marker({ lon: longitudeArray[i], lat: latitudeArray[i]},  
        {
        title: namedamArray[i], // กำหนดชื่อ marker
        icon: { 
            url: iconurl, // กำหนด icon ของ marker
            offset: { x: 12, y: 45 }}, // กำหนดตำแหน่งของ icon ของ marker
            detail: detailTextarray[i] // กำหนดข้อความใน popup
            
        
        });
        map.Overlays.add(marker);
    }
    const uprovince = document.getElementById("location");
    uprovince.addEventListener('change', function () {
        map.Overlays.clear();
        if (uprovince.value === "Default") {
            for(var i = 0; i < longitudeArray.length; i++){

                var marker = new longdo.Marker({ lon: longitudeArray[i], lat: latitudeArray[i]},  
                {
                title: namedamArray[i], // กำหนดชื่อ marker
                icon: { 
                    url: iconurl, // กำหนด icon ของ marker
                    offset: { x: 12, y: 45 }}, // กำหนดตำแหน่งของ icon ของ marker
                    detail: detailTextarray[i] // กำหนดข้อความใน popup
                });
                map.Overlays.add(marker);
            }
        } else {
            for (i = 0; i < provinceArray.length; i++) {
                if (uprovince.value === provinceArray[i]) {
                    var marker = new longdo.Marker({ lon: longitudeArray[i], lat: latitudeArray[i] },  
                    {
                        title: namedamArray[i],
                        icon: {
                            url: iconurl,
                            offset: { x: 12, y: 45 }
                        },
                        detail: detailTextarray[i]
                    });
                    map.Overlays.add(marker);
                }
            }
        }
    });
    const uregion = document.getElementById("check");
    uregion.addEventListener('change', function () {
        map.Overlays.clear();
        if (uregion.value === "Default") {
            for(var i = 0; i < longitudeArray.length; i++){

                var marker = new longdo.Marker({ lon: longitudeArray[i], lat: latitudeArray[i]},  
                {
                title: namedamArray[i], // กำหนดชื่อ marker
                icon: { 
                    url: iconurl, // กำหนด icon ของ marker
                    offset: { x: 12, y: 45 }}, // กำหนดตำแหน่งของ icon ของ marker
                    detail: detailTextarray[i] // กำหนดข้อความใน popup
                });
                map.Overlays.add(marker);
            }
        } else {
            for (i = 0; i < provinceArray.length; i++) {
                if (uregion.value === regionArray[i]) {
                    var marker = new longdo.Marker({ lon: longitudeArray[i], lat: latitudeArray[i] },  
                    {
                        title: namedamArray[i],
                        icon: {
                            url: iconurl,
                            offset: { x: 12, y: 45 }
                        },
                        detail: detailTextarray[i]
                    });
                    map.Overlays.add(marker);
                }
            }
        }

    });
    search = document.getElementById("searchdam");
    confirmButton  = document.getElementById("confirm");

if (search) {
    confirmButton.addEventListener('click', function () {
        map.Overlays.clear();

        var searchText = search.value;

        if (!searchText || namedamArray.indexOf(searchText) === -1) {
            for (var i = 0; i < namedamArray.length; i++) {
                var marker = new longdo.Marker({ lon: longitudeArray[i], lat: latitudeArray[i] },  
                {
                    title: namedamArray[i],
                    icon: {
                        url: iconurl,
                        offset: { x: 12, y: 45 }
                    },
                    detail: detailTextarray[i]
                });
                map.Overlays.add(marker);
            }
        } else {
            for (var i = 0; i < namedamArray.length; i++) {
                if (searchText === namedamArray[i]) {
                    var marker = new longdo.Marker({ lon: longitudeArray[i], lat: latitudeArray[i] },  
                    {
                        title: namedamArray[i],
                        icon: {
                            url: iconurl,
                            offset: { x: 12, y: 45 }
                        },
                        detail: detailTextarray[i]
                    });
                    map.Overlays.add(marker);
                    break;
                }
            }
        }
    });
} else {
    console.error("Element with id 'searchdam' or 'confirm' not found.");
}

var namedamless30 = document.getElementById("namedamless30");
var nammedammore30 = document.getElementById("namedammore30");
var namedammore50 = document.getElementById("namedamMore50");
var namedamMore80 = document.getElementById("namedamMore80");
var namedamMore100 = document.getElementById("namedamMore100");
var textRain = document.getElementById("textRain");
for (var i = 0; i < longitudeArray.length; i++) {
    if (percent_storageArray[i] < 30) {
        namedamless30.innerHTML += `<li>${namedamArray[i]}</li>`;
    } else if (percent_storageArray[i] >= 30 && percent_storageArray[i] < 50) {
        nammedammore30.innerHTML += `<li>${namedamArray[i]}</li>`;
    } else if (percent_storageArray[i] >= 50 && percent_storageArray[i] < 80) {
        namedammore50.innerHTML += `<li>${namedamArray[i]}</li>`;
    } else if (percent_storageArray[i] >= 80 && percent_storageArray[i] < 100) {
        namedamMore80.innerHTML += `<li>${namedamArray[i]}</li>`;
    } else if (percent_storageArray[i] >= 100) {
        namedamMore100.innerHTML += `<li>${namedamArray[i]}</li>`;
    } else if (rainArray[i] >= 80) {
        textRain.innerHTML += `<li>${provinceArray[i]}</li>`;
    }
}   
    if(namedamless30.innerHTML == ""){
        namedamless30.innerHTML = "ไม่มีเขื่อนในเกณฑ์นี้";
    } 
    if(nammedammore30.innerHTML == ""){
        nammedammore30.innerHTML = "ไม่มีเขื่อนในเกณฑ์นี้";
    }
    if(namedammore50.innerHTML == ""){
        namedammore50.innerHTML = "ไม่มีเขื่อนในเกณฑ์นี้";
    }
    if(namedamMore80.innerHTML == ""){
        namedamMore80.innerHTML = "ไม่มีเขื่อนในเกณฑ์นี้";
    }
    if(namedamMore100.innerHTML == ""){
        namedamMore100.innerHTML = "ไม่มีเขื่อนในเกณฑ์นี้";
    }
    if(textRain.innerHTML == ""){
        textRain.innerHTML = "ไม่มีจังหวัดที่เสี่ยงน้ำท่วม";
    }
    

}


function updateProvinces() {
    var selectedRegion = document.getElementById("check").value;
    var allProvinceGroups = document.getElementsByClassName("province-group");
    for (var i = 0; i < allProvinceGroups.length; i++) {
        allProvinceGroups[i].style.display = "none";
    }
    var selectedProvinceGroup = document.getElementById(selectedRegion);
    if (selectedProvinceGroup) {
        selectedProvinceGroup.style.display = "block";
    }
}

function rain(){
    axios({
        method: 'post',
        url: 'http://localhost:3000/api/test'
    })
    axios({
        method: 'get',
        url: 'http://localhost:3000/api/rain'
    })
    .then(function (response) {
        const data = response.data; // ดึงข้อมูลจาก response.data.data
        const rainArray = [];
        data.forEach(weanther => {
            rainArray.push(weanther.rain);
        });
        datadam(rainArray);
});

}
rain();
datadam(); 

