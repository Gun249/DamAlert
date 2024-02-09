document.addEventListener('DOMContentLoaded', function () {
    // เลือกทุกรายการ Accordion
    var accordions = document.querySelectorAll('.accordion-item');
  
    // วนลูปทุกรายการ Accordion
    accordions.forEach(function (accordion) {
      // ดึงปุ่มเพื่อเปิด/ปิด Accordion
      var accordionButton = accordion.querySelector('.accordion-button');
  
      // ดึงพื้นที่ที่ต้องการปิด/เปิด
      var accordionCollapse = accordion.querySelector('.accordion-collapse');
  
      // เพิ่มการตรวจสอบเหตุการณ์ click ในปุ่ม Accordion
      accordionButton.addEventListener('click', function () {
        // ตรวจสอบว่า Accordion ปัจจุบันเปิดหรือปิด
        var isCollapsed = accordionCollapse.classList.contains('show');
  
        // หากเปิดให้ปิด และ ngượcกัน
        if (isCollapsed) {
          accordionCollapse.classList.remove('show');
        } else {
          accordionCollapse.classList.add('show');
  
          // เพิ่มคลาส 'transitions' เพื่อให้มี transition effect
          setTimeout(function () {
            accordionCollapse.classList.add('transitions');
          }, 500);
        }
      });
    });
  });
  