const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');

/**
 * Script para gerar screenshots de sucesso dos testes
 * Captura a página em diferentes estados
 */

(async function gerarScreenshots() {
  console.log('\n╔════════════════════════════════════════╗');
  console.log('║   📸 GERANDO SCREENSHOTS DE SUCESSO   ║');
  console.log('╚════════════════════════════════════════╝\n');

  const options = new chrome.Options();
  options.addArguments('--headless');
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  options.addArguments('--window-size=1920,1080');
  options.addArguments(`--user-data-dir=/tmp/chrome-${Date.now()}`);

  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    console.log('📍 Abrindo página...');
    await driver.get('https://www.example.com/');
    
    // Screenshot 1: Página completa de sucesso
    console.log('📸 Capturando screenshot 1: Página completa');
    let screenshot = await driver.takeScreenshot();
    fs.writeFileSync('/workspaces/cicd_headless/teste-ui/sucesso_pagina_completa.png', screenshot, 'base64');
    console.log('✅ Salvo: sucesso_pagina_completa.png');

    // Screenshot 2: Após scroll
    console.log('📸 Capturando screenshot 2: Página com scroll');
    await driver.executeScript('window.scrollBy(0, 300);');
    screenshot = await driver.takeScreenshot();
    fs.writeFileSync('/workspaces/cicd_headless/teste-ui/sucesso_com_scroll.png', screenshot, 'base64');
    console.log('✅ Salvo: sucesso_com_scroll.png');

    // Screenshot 3: Zoom normal
    console.log('📸 Capturando screenshot 3: Com zoom 100%');
    await driver.executeScript('document.body.style.zoom = "100%";');
    screenshot = await driver.takeScreenshot();
    fs.writeFileSync('/workspaces/cicd_headless/teste-ui/sucesso_zoom_normal.png', screenshot, 'base64');
    console.log('✅ Salvo: sucesso_zoom_normal.png');

    // Screenshot 4: Informações da página
    console.log('📸 Capturando screenshot 4: Documento completo');
    const titulo = await driver.getTitle();
    const url = await driver.getCurrentUrl();
    const html = await driver.getPageSource();
    
    console.log(`\n📋 INFORMAÇÕES DA PÁGINA:`);
    console.log(`   Título: ${titulo}`);
    console.log(`   URL: ${url}`);
    console.log(`   Tamanho HTML: ${html.length} bytes`);
    
    screenshot = await driver.takeScreenshot();
    fs.writeFileSync('/workspaces/cicd_headless/teste-ui/sucesso_final.png', screenshot, 'base64');
    console.log('✅ Salvo: sucesso_final.png');

    console.log('\n╔════════════════════════════════════════╗');
    console.log('║   ✅ SCREENSHOTS GERADOS COM SUCESSO  ║');
    console.log('╚════════════════════════════════════════╝\n');

    console.log('📂 Screenshots de sucesso criados:');
    console.log('   1. sucesso_pagina_completa.png');
    console.log('   2. sucesso_com_scroll.png');
    console.log('   3. sucesso_zoom_normal.png');
    console.log('   4. sucesso_final.png\n');

  } catch (err) {
    console.error('❌ ERRO:', err.message);
  } finally {
    await driver.quit();
  }
})();
