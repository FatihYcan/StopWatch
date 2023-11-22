let isRunning = false; // Kronometre çalışma durumu
let startTime; // Başlangıç zamanı
let elapsedTime = 0; // Geçen süre
let intervalId; // setInterval tarafından döndürülen ID

// setInterval : milisaniye cinsinden tanımlanan süreyle belirli aralıkta tanımlanan fonksiyonu çalıştırmaktadır
//setInterval : belirli aralıklarla (milisaniye cinsinden) bir işlevi çağırır.

// Kronometreyi başlat veya duraklat
function startPause() {
  if (isRunning) {
    clearInterval(intervalId); // Eğer kronometre çalışıyorsa duraklat
  } else {
    startTime = Date.now() - elapsedTime; // Başlangıç zamanını güncelle
    intervalId = setInterval(updateStopwatch, 10); // Salise hassasiyetinde güncelle
  }
  isRunning = !isRunning; // Kronometre durumunu tersine çevir
  updateButtonAppearance(); // Buton görünümünü güncelle
}

// Kronometreyi durdur
function stop() {
  clearInterval(intervalId); // Kronometreyi duraklat
  isRunning = false; // Kronometre durumunu sıfırla
  elapsedTime = 0; // Geçen süreyi sıfırla
  document.getElementById("stopwatch").innerText = "00:00:00"; // Kronometreyi sıfırla
  updateButtonAppearance(); // Buton görünümünü güncelle
}

// Kronometreyi güncelle
function updateStopwatch() {
  // Şu anki zamanı al
  const currentTime = Date.now();
  // Başlangıç zamanından bu yana geçen toplam süreyi hesapla
  elapsedTime = currentTime - startTime;

  // Dakika, saniye ve salise hesaplamaları
  const minutes = Math.floor(elapsedTime / (60 * 1000));
  const seconds = Math.floor((elapsedTime % (60 * 1000)) / 1000);
  const centiseconds = Math.floor((elapsedTime % 1000) / 10);

  // Formatlı zamanı göster
  const formattedTime = `${part(minutes)}:${part(seconds)}:${part(
    centiseconds
  )}`;
  document.getElementById("stopwatch").innerText = formattedTime;
}

// Sayıyı iki haneli yapmak için kullanılan yardımcı fonksiyon
function part(value) {
  return value < 10 ? `0${value}` : value;
}

// Başlat/Duraklat butonunun görünümünü güncelleyen fonksiyon
function updateButtonAppearance() {
  const button = document.getElementById("startPauseButton");
  // Kronometre çalışıyorsa border rengini sarı, çalışmıyorsa yeşil yap
  button.style.border = isRunning ? "2px solid yellow" : "2px solid green";
  // Buton içeriğini güncelle, duruma göre "Oynat" veya "Duraklat" ikonlarıyla
  button.innerHTML = isRunning
    ? '<i class="fas fa-pause text-warning"></i>'
    : ' <i class="fas fa-play text-success"></i>';
}
