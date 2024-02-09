function changePage(page) 
{
    window.location.href = page;
}

function scrollToTarget() {
    // ใช้ smooth scrolling เพื่อทำให้การเลื่อนหน้าเว็บนุ่มนวล
    document.getElementById('check').scrollIntoView({ behavior: 'smooth' });
  }
  