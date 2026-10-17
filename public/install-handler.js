let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  // Criar um elemento visual de botão flutuante para instalar o app se não existir
  if (!document.getElementById('nexa-install-btn')) {
    const installBtn = document.createElement('div');
    installBtn.id = 'nexa-install-btn';
    installBtn.innerHTML = '⚡ Instalar NEXA FUTURE App';
    installBtn.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 9999; background: #00f0ff; color: #050b14; padding: 12px 20px; font-weight: bold; border-radius: 30px; box-shadow: 0 0 20px rgba(0,240,255,0.6); cursor: pointer; font-family: sans-serif;';
    
    installBtn.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          console.log('Utilizador aceitou a instalação');
        }
        deferredPrompt = null;
        installBtn.style.display = 'none';
      }
    });
    
    document.body.appendChild(installBtn);
  }
});
