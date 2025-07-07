const statusEl = document.getElementById('status');
const alphaEl = document.getElementById('alpha');
const betaEl = document.getElementById('beta');
const gammaEl = document.getElementById('gamma');

// ✅ 這邊改成你的 WebSocket server 網址（部署上去後）
const socket = new WebSocket("wss://" + window.location.host);

// --- WebSocket 事件 ---
socket.addEventListener('open', () => {
  statusEl.textContent = "✅ 已連線";
});

socket.addEventListener('close', () => {
  statusEl.textContent = "❌ 連線中斷";
});

socket.addEventListener('error', (e) => {
  statusEl.textContent = "⚠️ 連線錯誤";
  console.error("WebSocket error:", e);
});

// --- 陀螺儀 ---
window.addEventListener('deviceorientation', (event) => {
  const { alpha, beta, gamma } = event;
  if (socket.readyState === WebSocket.OPEN) {
    const data = { alpha, beta, gamma };
    socket.send(JSON.stringify(data));
  }

  // 顯示在畫面上
  alphaEl.textContent = alpha?.toFixed(1) ?? 'N/A';
  betaEl.textContent = beta?.toFixed(1) ?? 'N/A';
  gammaEl.textContent = gamma?.toFixed(1) ?? 'N/A';
});
