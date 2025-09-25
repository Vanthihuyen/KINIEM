// Ngày bắt đầu yêu (YYYY, MM-1, DD)
const startDate = new Date(2022, 9, 15); // tháng 10 là 9 vì đếm từ 0
const popup = document.getElementById('anniversaryPopup');

function updateCounter() {
  const now = new Date();
  let diffMs = now - startDate;

  if(diffMs < 0){
    // Chưa đến ngày bắt đầu
    document.getElementById('days').textContent = "0";
    document.getElementById('hours').textContent = "0";
    document.getElementById('minutes').textContent = "0";
    document.getElementById('seconds').textContent = "0";
    popup.style.display = 'none';
    return;
  }

  // Tính tổng ngày yêu
  const totalDays = Math.floor(diffMs / (1000*60*60*24));

  // Tính giờ, phút, giây
  const totalHours = Math.floor(diffMs / (1000*60*60));
  const totalMinutes = Math.floor(diffMs / (1000*60));
  const totalSeconds = Math.floor(diffMs / 1000);

  // Hiển thị thời gian từng đơn vị
  document.getElementById('days').textContent = totalDays;
  document.getElementById('hours').textContent = totalHours % 24;
  document.getElementById('minutes').textContent = Math.floor((totalMinutes % 60));
  document.getElementById('seconds').textContent = Math.floor((totalSeconds % 60));

  // Kiểm tra kỷ niệm đặc biệt
  checkAnniversary(totalDays, now);
}

function checkAnniversary(days, now) {
  // 1 tháng ~ 30 ngày
  const isMonth = days > 0 && days % 30 === 0;
  const isYear = days > 0 && days % 365 === 0;
  const isThousand = days > 0 && days % 1000 === 0;

  if(isMonth || isYear || isThousand){
    let msg = 'Hôm nay là ngày kỷ niệm ';
    if(isThousand) msg += `tròn ${days} ngày yêu! 🎉❤️`;
    else if(isYear) msg += `tròn ${days / 365} năm yêu! 🎉❤️`;
    else if(isMonth) msg += `tròn ${days / 30} tháng yêu! 🎉❤️`;

    popup.textContent = msg;
    popup.style.display = 'block';
  } else {
    popup.style.display = 'none';
  }
}

// Khi click popup hiện hiệu ứng trái tim đập
popup.addEventListener('click', e => {
  createHeart(e.clientX, e.clientY);
});

// Tạo trái tim ở vị trí click, tự động biến mất
function createHeart(x, y) {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 2000);
}

// Cập nhật mỗi giây
setInterval(updateCounter, 1000);

// Chạy lần đầu
updateCounter();
