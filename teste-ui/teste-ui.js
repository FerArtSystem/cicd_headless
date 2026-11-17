const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');
const fs = require('fs');

(async function testeInterface() {
  // Configurações para modo headless funcional em containers
  const options = new chrome.Options();
  options.addArguments('--headless'); // executa sem janela gráfica
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  options.addArguments('--window-size=1920,1080');
  options.addArguments('--disable-blink-features=AutomationControlled');
  // cria diretório temporário único a cada execução
  options.addArguments(`--user-data-dir=/tmp/chrome-${Date.now()}`);

  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  // Define timeout de 10 segundos para operações
  driver.manage().setTimeouts({ implicit: 10000, pageLoad: 10000 });

  let testResults = {
    passed: 0,
    failed: 0,
    errors: []
  };

  try {
    console.log('\n=== INICIANDO TESTES DE INTERFACE ===\n');
    
    console.log('📍 Teste 1: Abrindo site de exemplo...');
    await driver.get('https://www.example.com/');
    console.log('✅ Site carregado com sucesso!');
    testResults.passed++;

    // Verificar título da página
    console.log('\n📍 Teste 2: Verificando título da página...');
    const titulo = await driver.getTitle();
    console.log(`Título encontrado: "${titulo}"`);
    expect(titulo).to.include('Example');
    console.log('✅ Título verificado com sucesso!');
    testResults.passed++;

    // Verificar visibilidade do body
    console.log('\n📍 Teste 3: Verificando visibilidade do body...');
    const bodyElement = await driver.findElement(By.css('body'));
    const isBodyVisible = await bodyElement.isDisplayed();
    console.log(`Body visível: ${isBodyVisible}`);
    expect(isBodyVisible).to.be.true;
    console.log('✅ Body verificado com sucesso!');
    testResults.passed++;

    // Testar elemento HTML
    console.log('\n📍 Teste 4: Verificando elemento HTML...');
    const htmlElement = await driver.findElement(By.css('html'));
    const htmlLang = await htmlElement.getAttribute('lang');
    console.log(`HTML lang: "${htmlLang}"`);
    expect(htmlElement).to.exist;
    console.log('✅ Elemento HTML encontrado com sucesso!');
    testResults.passed++;

    // Testar elemento HEAD
    console.log('\n📍 Teste 5: Verificando elemento HEAD...');
    const headElement = await driver.findElement(By.css('head'));
    const metaTags = await driver.findElements(By.css('meta'));
    console.log(`${metaTags.length} meta tags encontradas`);
    expect(metaTags.length).to.be.greaterThan(0);
    console.log('✅ Meta tags encontradas com sucesso!');
    testResults.passed++;

    // Testar URL
    console.log('\n📍 Teste 6: Verificando URL atual...');
    const currentUrl = await driver.getCurrentUrl();
    console.log(`URL atual: "${currentUrl}"`);
    expect(currentUrl).to.include('example.com');
    console.log('✅ URL verificada com sucesso!');
    testResults.passed++;

    // Captura de tela
    console.log('\n📍 Capturando screenshot...');
    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync('/workspaces/cicd_headless/teste-ui/resultado_teste.png', screenshot, 'base64');
    console.log('✅ Screenshot salvo como resultado_teste.png');

    console.log('\n╔════════════════════════════════════╗');
    console.log('║      RESUMO DOS TESTES             ║');
    console.log('╠════════════════════════════════════╣');
    console.log(`║ ✅ Testes passados: ${testResults.passed}             ║`.padEnd(36) + '║');
    console.log(`║ ❌ Testes falhados: ${testResults.failed}             ║`.padEnd(36) + '║');
    console.log('║ 🎉 TODOS OS TESTES PASSARAM!      ║');
    console.log('╚════════════════════════════════════╝\n');

  } catch (err) {
    console.error('\n❌ ERRO DURANTE OS TESTES:', err.message);
    testResults.failed++;
    testResults.errors.push(err.message);
    
    // Captura screenshot do erro
    try {
      const screenshot = await driver.takeScreenshot();
      fs.writeFileSync('/workspaces/cicd_headless/teste-ui/erro_screenshot.png', screenshot, 'base64');
      console.log('📸 Screenshot do erro salvo como erro_screenshot.png');
    } catch (screenshotErr) {
      console.error('Não foi possível capturar screenshot:', screenshotErr.message);
    }
  } finally {
    await driver.quit();
    console.log('🔌 Conexão com o navegador encerrada.\n');
  }
})();