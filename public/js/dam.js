const unit = "ล้านลูกบาศก์เมตร";
let namedamArray = [];
let storageArray = [];
let capacityArray = [];
let ownerArray = [];
let active_storageArray = [];
let dead_storageArray = [];
let volumeArray = [];
let percent_storageArray = [];
let provinceArray = [];
let latitudeArray = [];
let longitudeArray = [];

function detaildam() {
    var detaildam = document.getElementById("StoredQuantity");
    var detaildam2 = document.getElementById("MaximumStored");
    var detaildam3 = document.getElementById("waterused");
    var detaildam5 = document.getElementById("Volumeofwater");
    var detaildam6 = document.getElementById("Ower");
    var detaildam7 = document.getElementById("NameDam");
    var damSelect = document.getElementById("Dam");

    damSelect.addEventListener('change', function () {
        var selectedDamIndex = damSelect.selectedIndex;

        detaildam6.innerHTML = `เจ้าของ : ${ownerArray[selectedDamIndex]}`;
        detaildam7.innerHTML = `ชื่อเขื่อน : ${namedamArray[selectedDamIndex]}`;
        detaildam.innerHTML = `ปริมาณที่กักเก็บ : ${storageArray[selectedDamIndex]} ${unit}`;
        detaildam2.innerHTML = `ปริมาณที่กักเก็บสูงสุด : ${capacityArray[selectedDamIndex]} ${unit}`;
        detaildam3.innerHTML = `ปริมาณน้ำที่ใช้ได้ : ${active_storageArray[selectedDamIndex]} ${unit}`;
        detaildam5.innerHTML = `ปริมาณน้ำในเขื่อน : ${volumeArray[selectedDamIndex]} ${unit}`;
    });
}

axios({
    method: 'get',
    url: 'http://localhost:3000/api/dam'
})
.then(function (response) {
    const data = response.data;
    data.forEach(region => {
        region.dam.forEach(dam => {
            namedamArray.push(dam.name);
            storageArray.push(dam.storage);
            capacityArray.push(dam.capacity);
            ownerArray.push(dam.owner);
            active_storageArray.push(dam.active_storage);
            dead_storageArray.push(dam.dead_storage);
            volumeArray.push(dam.volume);
            percent_storageArray.push(dam.percent_storage);
            provinceArray.push(dam.province);
            latitudeArray.push(dam.lat);
            longitudeArray.push(dam.lng);
        });
    });

    detaildam(); 
});
