const statusEl = document.getElementById('status');
const alphaEl = document.getElementById('alpha');
const betaEl = document.getElementById('beta');
const gammaEl = document.getElementById('gamma');

// ✅ 這邊改成你的 WebSocket server 網址（部署上去後）
// 建議改這樣以相容本地與線上
const protocol = location.protocol === 'https:' ? 'wss://' : 'ws://';

const ws = new WebSocket('ws://localhost:3000');

const logDiv = document.getElementById('log');
const input = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

function log(message) {
  logDiv.textContent += message + '\n';
  logDiv.scrollTop = logDiv.scrollHeight;
}

ws.onopen = () => {
  log('連線已開啟');
};

ws.onmessage = (event) => {
  log('收到伺服器訊息：' + event.data);
};

ws.onerror = (error) => {
  log('WebSocket 錯誤: ' + error.message);
};

ws.onclose = () => {
  log('連線已關閉');
  log(protocol + location.host);
};

sendBtn.onclick = () => {
  const msg = input.value;
  if (msg && ws.readyState === WebSocket.OPEN) {
    ws.send(msg);
    log('送出訊息：' + msg);
    input.value = '';
  }
};

// --- 陀螺儀 ---
window.addEventListener('deviceorientation', (event) => {
  // const { alpha, beta, gamma } = event;
  // if (socket.readyState === WebSocket.OPEN) {
  //   const data = { alpha, beta, gamma };
  //   socket.send(JSON.stringify(data));
  // }

  // 顯示在畫面上
  alphaEl.textContent = alpha?.toFixed(1) ?? 'N/A';
  betaEl.textContent = beta?.toFixed(1) ?? 'N/A';
  gammaEl.textContent = gamma?.toFixed(1) ?? 'N/A';
});
