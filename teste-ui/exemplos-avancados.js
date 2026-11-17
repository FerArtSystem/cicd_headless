const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');
const fs = require('fs');

/**
 * Exemplos Avançados de Testes com Selenium WebDriver
 * Este arquivo mostra técnicas mais complexas para testes de UI
 */

// ============================================================
// Exemplo 1: Teste com Waits (Esperando Elementos)
// ============================================================
async function exemploWaits() {
  console.log('\n📍 Exemplo 1: Esperando Elementos Aparecerem\n');
  
  const options = new chrome.Options();
  options.addArguments('--headless', '--no-sandbox', '--disable-dev-shm-usage');
  
  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    await driver.get('https://www.example.com/');
    
    // Esperar até que um elemento esteja visível (máximo 5 segundos)
    const bodyElement = await driver.wait(
      until.elementLocated(By.css('body')),
      5000
    );
    
    console.log('✅ Elemento encontrado após esperar');
    
    // Esperar até que um elemento seja visível
    await driver.wait(
      until.elementIsVisible(bodyElement),
      5000
    );
    
    console.log('✅ Elemento está visível');
    
  } catch (err) {
    console.error('❌ Erro:', err.message);
  } finally {
    await driver.quit();
  }
}

// ============================================================
// Exemplo 2: Teste com Cliques e Envio de Teclas
// ============================================================
async function exemploInteracoes() {
  console.log('\n📍 Exemplo 2: Interações (Cliques e Digitação)\n');
  
  const options = new chrome.Options();
  options.addArguments('--headless', '--no-sandbox', '--disable-dev-shm-usage');
  
  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    await driver.get('https://www.google.com/');
    
    // Encontrar campo de busca
    const searchBox = await driver.findElement(By.css('textarea'));
    
    // Digitar no campo
    await searchBox.sendKeys('Selenium WebDriver');
    console.log('✅ Texto digitado no campo de busca');
    
    // Pressionar Enter
    await searchBox.sendKeys(require('selenium-webdriver').Key.ENTER);
    console.log('✅ Tecla Enter pressionada');
    
    // Aguardar a página de resultados carregar
    await driver.wait(until.urlContains('search'), 5000);
    console.log('✅ Resultados de busca carregados');
    
  } catch (err) {
    console.error('❌ Erro:', err.message);
  } finally {
    await driver.quit();
  }
}

// ============================================================
// Exemplo 3: Captura de Múltiplos Screenshots
// ============================================================
async function exemploScreenshots() {
  console.log('\n📍 Exemplo 3: Captura de Screenshots em Diferentes Estados\n');
  
  const options = new chrome.Options();
  options.addArguments('--headless', '--no-sandbox', '--disable-dev-shm-usage');
  
  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    // Screenshot 1: Página inicial
    await driver.get('https://www.example.com/');
    let screenshot = await driver.takeScreenshot();
    fs.writeFileSync('screenshot_1_inicial.png', screenshot, 'base64');
    console.log('📸 Screenshot 1 salvo: screenshot_1_inicial.png');
    
    // Screenshot 2: Após scroll (se houver)
    await driver.executeScript('window.scrollBy(0, 500);');
    screenshot = await driver.takeScreenshot();
    fs.writeFileSync('screenshot_2_scroll.png', screenshot, 'base64');
    console.log('📸 Screenshot 2 salvo: screenshot_2_scroll.png');
    
  } catch (err) {
    console.error('❌ Erro:', err.message);
  } finally {
    await driver.quit();
  }
}

// ============================================================
// Exemplo 4: Executar JavaScript no Navegador
// ============================================================
async function exemploJavaScript() {
  console.log('\n📍 Exemplo 4: Executar JavaScript no Navegador\n');
  
  const options = new chrome.Options();
  options.addArguments('--headless', '--no-sandbox', '--disable-dev-shm-usage');
  
  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    await driver.get('https://www.example.com/');
    
    // Obter título via JavaScript
    const titulo = await driver.executeScript('return document.title;');
    console.log(`✅ Título via JS: ${titulo}`);
    
    // Obter dimensões da janela
    const dimensoes = await driver.executeScript(`
      return {
        width: window.innerWidth,
        height: window.innerHeight,
        url: window.location.href
      };
    `);
    
    console.log(`✅ Dimensões: ${dimensoes.width}x${dimensoes.height}`);
    console.log(`✅ URL: ${dimensoes.url}`);
    
  } catch (err) {
    console.error('❌ Erro:', err.message);
  } finally {
    await driver.quit();
  }
}

// ============================================================
// Exemplo 5: Teste de Performance (PageSpeed)
// ============================================================
async function exemploPerformance() {
  console.log('\n📍 Exemplo 5: Medição de Tempo de Carregamento\n');
  
  const options = new chrome.Options();
  options.addArguments('--headless', '--no-sandbox', '--disable-dev-shm-usage');
  
  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    const inicio = Date.now();
    
    await driver.get('https://www.example.com/');
    
    const fim = Date.now();
    const tempo = fim - inicio;
    
    console.log(`⏱️ Tempo de carregamento: ${tempo}ms`);
    
    if (tempo < 1000) {
      console.log('✅ Carregamento rápido (<1s)');
    } else if (tempo < 3000) {
      console.log('⚠️ Carregamento moderado (1-3s)');
    } else {
      console.log('❌ Carregamento lento (>3s)');
    }
    
  } catch (err) {
    console.error('❌ Erro:', err.message);
  } finally {
    await driver.quit();
  }
}

// ============================================================
// Exemplo 6: Teste com Cookies
// ============================================================
async function exemploCookies() {
  console.log('\n📍 Exemplo 6: Manipulação de Cookies\n');
  
  const options = new chrome.Options();
  options.addArguments('--headless', '--no-sandbox', '--disable-dev-shm-usage');
  
  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    await driver.get('https://www.example.com/');
    
    // Adicionar um cookie
    await driver.manage().addCookie({
      name: 'meu-cookie',
      value: 'teste123',
      domain: 'example.com'
    });
    console.log('✅ Cookie adicionado');
    
    // Obter todos os cookies
    const cookies = await driver.manage().getCookies();
    console.log(`✅ Total de cookies: ${cookies.length}`);
    
    // Deletar um cookie específico
    await driver.manage().deleteCookie('meu-cookie');
    console.log('✅ Cookie deletado');
    
  } catch (err) {
    console.error('❌ Erro:', err.message);
  } finally {
    await driver.quit();
  }
}

// ============================================================
// Exemplo 7: Teste com Local Storage
// ============================================================
async function exemploLocalStorage() {
  console.log('\n📍 Exemplo 7: Manipulação de Local Storage\n');
  
  const options = new chrome.Options();
  options.addArguments('--headless', '--no-sandbox', '--disable-dev-shm-usage');
  
  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    await driver.get('https://www.example.com/');
    
    // Adicionar item no Local Storage
    await driver.executeScript(`
      localStorage.setItem('usuario', 'João Silva');
      localStorage.setItem('tema', 'escuro');
    `);
    console.log('✅ Dados adicionados ao Local Storage');
    
    // Recuperar dados do Local Storage
    const usuario = await driver.executeScript(`
      return localStorage.getItem('usuario');
    `);
    console.log(`✅ Usuário recuperado: ${usuario}`);
    
    // Limpar Local Storage
    await driver.executeScript('localStorage.clear();');
    console.log('✅ Local Storage limpo');
    
  } catch (err) {
    console.error('❌ Erro:', err.message);
  } finally {
    await driver.quit();
  }
}

// ============================================================
// Menu Principal
// ============================================================
async function main() {
  console.log('\n╔════════════════════════════════════════╗');
  console.log('║   EXEMPLOS AVANÇADOS - SELENIUM TEST   ║');
  console.log('╚════════════════════════════════════════╝');
  
  // Descomente o exemplo que deseja executar:
  
  // await exemploWaits();                    // Exemplo 1
  // await exemploInteracoes();               // Exemplo 2
  // await exemploScreenshots();              // Exemplo 3
  // await exemploJavaScript();               // Exemplo 4
  // await exemploPerformance();              // Exemplo 5
  // await exemploCookies();                  // Exemplo 6
  // await exemploLocalStorage();             // Exemplo 7
  
  // Executar todos os exemplos:
  console.log('\n🚀 Executando todos os exemplos...\n');
  
  try {
    await exemploWaits();
    await exemploJavaScript();
    await exemploPerformance();
    await exemploCookies();
    await exemploLocalStorage();
    
    console.log('\n✅ Todos os exemplos executados com sucesso!\n');
  } catch (err) {
    console.error('❌ Erro ao executar exemplos:', err);
  }
}

// Executar
if (require.main === module) {
  main();
}

module.exports = {
  exemploWaits,
  exemploInteracoes,
  exemploScreenshots,
  exemploJavaScript,
  exemploPerformance,
  exemploCookies,
  exemploLocalStorage
};
