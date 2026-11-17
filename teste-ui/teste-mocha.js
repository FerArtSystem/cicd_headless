const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');
const fs = require('fs');

describe('Testes de Interface - Example.com', function() {
  this.timeout(30000);
  let driver;

  before(async function() {
    const options = new chrome.Options();
    options.addArguments('--headless');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--window-size=1920,1080');
    options.addArguments(`--user-data-dir=/tmp/chrome-${Date.now()}`);

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    driver.manage().setTimeouts({ implicit: 10000, pageLoad: 10000 });
    await driver.get('https://www.example.com/');
  });

  after(async function() {
    if (driver) {
      await driver.quit();
    }
  });

  it('deve carregar a página com sucesso', async function() {
    const titulo = await driver.getTitle();
    expect(titulo).to.include('Example');
  });

  it('deve verificar o título da página', async function() {
    const titulo = await driver.getTitle();
    expect(titulo).to.equal('Example Domain');
  });

  it('deve ter o body visível', async function() {
    const bodyElement = await driver.findElement(By.css('body'));
    const isVisible = await bodyElement.isDisplayed();
    expect(isVisible).to.be.true;
  });

  it('deve ter atributo lang no HTML', async function() {
    const htmlElement = await driver.findElement(By.css('html'));
    const lang = await htmlElement.getAttribute('lang');
    expect(lang).to.equal('en');
  });

  it('deve ter meta tags', async function() {
    const metaTags = await driver.findElements(By.css('meta'));
    expect(metaTags.length).to.be.greaterThan(0);
  });

  it('deve estar na URL correta', async function() {
    const url = await driver.getCurrentUrl();
    expect(url).to.include('example.com');
  });

  it('deve ter elemento head', async function() {
    const headElement = await driver.findElement(By.css('head'));
    expect(headElement).to.exist;
  });

  it('deve ter título tag dentro de head', async function() {
    const titleElement = await driver.findElement(By.css('head > title'));
    const titleText = await titleElement.getText();
    // Se getText retorna vazio, verifica o valor do atributo
    if (!titleText) {
      const titleAttr = await titleElement.getAttribute('textContent');
      expect(titleText || titleAttr).to.be.ok;
    } else {
      expect(titleText).to.include('Example');
    }
  });
});
