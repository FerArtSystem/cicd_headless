# 🧪 Testes de Interface (UI) - Node.js + Selenium Headless

Este projeto demonstra como configurar e executar testes automatizados de interface com Node.js e Selenium WebDriver em modo headless, ideal para containers e Codespaces.

## 📋 Pré-requisitos

- Node.js v18+
- Google Chrome/Chromium instalado
- npm ou yarn

## 🚀 Início Rápido

### 1. Instalar Dependências
```bash
npm install
```

As dependências incluem:
- **selenium-webdriver**: driver para automação
- **chromedriver**: gerenciador do Chrome
- **mocha**: framework de testes
- **chai**: biblioteca de assertions

### 2. Executar Testes

**Opção A: Com Framework Mocha (Recomendado)**
```bash
npm test
```
Executa 8 testes estruturados com relatório detalhado.

**Opção B: Script Standalone**
```bash
npm run test:ui
```
Executa testes sem framework, com output colorido e screenshot automático.

## 📂 Estrutura do Projeto

```
teste-ui/
├── package.json              # Configurações do projeto
├── package-lock.json         # Lock de versões
├── teste-ui.js              # Script de teste standalone
├── teste-mocha.js           # Suite de testes com Mocha
├── RELATORIO.md             # Relatório detalhado dos testes
├── README.md                # Este arquivo
├── resultado_teste.png      # Screenshot da página
└── erro_screenshot.png      # Screenshot em caso de erro
```

## 🔧 Configuração Headless

O projeto está configurado para rodar em modo headless com as seguintes opções:

```javascript
const options = new chrome.Options();
options.addArguments('--headless');              // Sem interface gráfica
options.addArguments('--no-sandbox');            // Para containers
options.addArguments('--disable-dev-shm-usage'); // Usar disco como RAM
options.addArguments('--window-size=1920,1080'); // Resolução virtual
options.addArguments(`--user-data-dir=/tmp/chrome-${Date.now()}`);
```

## 📊 Testes Inclusos

### teste-ui.js
Teste simples sem framework que valida:
- ✅ Carregamento do site
- ✅ Título da página
- ✅ Visibilidade do conteúdo
- ✅ Captura automática de screenshot

### teste-mocha.js
Suite com 8 testes estruturados:
1. Carregamento bem-sucedido
2. Título correto
3. Body visível
4. Atributo lang do HTML
5. Presença de meta tags
6. URL correta
7. Elemento head
8. Title tag dentro de head

## 🎯 Heurísticas de Nielsen Testadas

Este projeto valida os princípios de usabilidade de Nielsen:

1. **Visibilidade do Sistema**: Título descritivo e elementos carregados
2. **Compatibilidade**: Suporte a múltiplos idiomas
3. **Controle do Usuário**: Estrutura HTML semântica
4. **Design Minimalista**: Carregamento rápido
5. **Prevenção de Erros**: Sem erros críticos

## 📸 Capturas de Tela

Ambos os scripts geram screenshots automaticamente:

```javascript
const screenshot = await driver.takeScreenshot();
fs.writeFileSync('resultado_teste.png', screenshot, 'base64');
```

## 🔄 Integração com CI/CD

Este projeto pode ser facilmente integrado com GitHub Actions:

```yaml
- name: Instalar dependências
  run: npm install

- name: Executar testes
  run: npm test
```

## 🛠️ Customização

### Testar um site diferente
Edite a URL em `teste-ui.js` ou `teste-mocha.js`:

```javascript
await driver.get('https://seu-site.com/');
```

### Adicionar novos testes
No `teste-mocha.js`, adicione um novo `it()`:

```javascript
it('deve validar elemento específico', async function() {
  const elemento = await driver.findElement(By.css('.seu-seletor'));
  expect(elemento).to.exist;
});
```

### Aumentar timeout
Para sites lentos, aumente o timeout:

```javascript
driver.manage().setTimeouts({ 
  implicit: 15000,    // 15 segundos
  pageLoad: 20000    // 20 segundos
});
```

## 🐛 Troubleshooting

### Erro: "Chrome not found"
```bash
# Ubuntu/Debian
sudo apt-get install google-chrome-stable

# macOS
brew install google-chrome
```

### Erro: "Port already in use"
O projeto já cria diretórios temporários únicos. Se o erro persistir:
```bash
pkill -f chromedriver
```

### Screenshots vazios
Aumentar o tempo de espera antes de capturar:

```javascript
await driver.sleep(2000); // 2 segundos
const screenshot = await driver.takeScreenshot();
```

## 📚 Recursos Úteis

- [Selenium WebDriver Docs](https://www.selenium.dev/documentation/)
- [Mocha Docs](https://mochajs.org/)
- [Chai Assertions](https://www.chaijs.com/)
- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)

## 📝 Relatório

Veja o arquivo `RELATORIO.md` para um relatório completo com:
- Resultados de testes
- Heurísticas de Nielsen aplicadas
- Recomendações de próximos passos
- Benchmarks e conclusões

## 📄 Licença

MIT

## 👨‍💻 Autor

Copilot AI Assistant - Demonstração de Testes UI com Selenium

---

**Pronto para usar!** Execute `npm test` ou `npm run test:ui` para começar. 🚀
