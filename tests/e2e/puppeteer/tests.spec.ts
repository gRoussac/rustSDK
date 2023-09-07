const puppeteer = require('puppeteer');
const { Browser, Page } = puppeteer;
const casper_wasm_sdk = require('casper-wasm-sdk');
const { SDK, privateToPublicKey, Verbosity } = casper_wasm_sdk;
const fs = require('fs');
const path = require('path');
const keyPath = '../../../../NCTL/casper-node/utils/nctl/assets/net-1/users/user-1/secret_key.pem';
let browser: typeof Browser;
let page: typeof Page;
let sdk: typeof SDK;
const node_address = 'http://localhost:11101';
const chain_name = 'casper-net-1';
let private_key = '';
let public_key = '';

describe('Angular App Tests', () => {
  beforeAll(async () => {
    setupFixtures();
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

function readPEMFile() {
  // Construct the full path using the relative path
  const pemFilePath = path.resolve(__dirname, keyPath);

  // Read the PEM file and return its content
  try {
    const data = fs.readFileSync(pemFilePath, 'utf8');
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

async function setupFixtures() {
  sdk = new SDK();
  private_key = readPEMFile();
  public_key = privateToPublicKey(private_key);
  console.log(private_key);
  console.log(public_key);
  get_peers();
}

async function get_peers() {
  const peers_result = await sdk.get_peers("http://localhost:11101", Verbosity.High);
  if (peers_result) {
    const peers = peers_result?.peers;
    console.log(peers);
  }
}
