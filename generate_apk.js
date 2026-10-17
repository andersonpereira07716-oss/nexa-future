const fs = require('fs');

async function buildAPK() {
  console.log('🚀 A solicitar a geração do APK ao PWABuilder...');
  
  try {
    const response = await fetch('https://pwabuilder-android-generator.azurewebsites.net/generateAtUri', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: 'https://nexa-future-eight.vercel.app',
        name: 'NEXA FUTURE',
        packageId: 'com.nexafuture.app',
        themeColor: '#0f172a',
        backgroundColor: '#0f172a'
      })
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    fs.writeFileSync('nexa-future-apk.zip', Buffer.from(buffer));
    console.log('✅ Pacote gerado com sucesso! Salvo como nexa-future-apk.zip');
  } catch (err) {
    console.error('❌ Erro ao gerar o APK:', err.message);
  }
}

buildAPK();
