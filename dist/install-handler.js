
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (!document.getElementById('nexa-install-btn')) {
    const btn = document.createElement('div');
    btn.id = 'nexa-install-btn';
    btn.innerHTML = '⚡ Instalar NEXA FUTURE App';
    btn.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 9999; background: #00f0ff; color: #050b14; padding: 12px 20px; font-weight: bold; border-radius: 30px; box-shadow: 0 0 20px rgba(0,240,255,0.6); cursor: pointer; font-family: sans-serif;';
    btn.onclick = async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
        deferredPrompt = null;
        btn.style.display = 'none';
      }
    };
    document.body.appendChild(btn);
  }
});
