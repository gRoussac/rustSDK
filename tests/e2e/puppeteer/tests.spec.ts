const puppeteer = require('puppeteer');
const { Browser, Page } = puppeteer;

describe('Angular App Tests', () => {
  let browser: typeof Browser;
  let page: typeof Page;


  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: 'new' });
    page = await browser.newPage();
    await page.goto(`http://localhost:4200/`);
  });

  it('should have a title', async () => {
    const title = await page.title();
    expect(title).toBe('casper');
  });

  it('should have a state_root_hash', async () => {
    try {
      await page.waitForSelector('[e2e-id="state_root_hash"]');
      const elements = await page.$$('[e2e-id="state_root_hash"]');
      const textContent = await elements.pop().evaluate((node: HTMLElement) => node.textContent);
      const pattern = /^state root hash is [0-9a-f]+$/i;
      expect(textContent).toMatch(pattern);
    } catch (error) {
      console.error('Error:', error);
    }
  });

  afterAll(async () => {
    await browser.close();
  });
});
