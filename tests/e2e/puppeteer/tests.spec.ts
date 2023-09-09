import { PublicKey, getBlockOptions } from "../node_modules/casper-wasm-sdk/casper_wasm_sdk";

const puppeteer = require('puppeteer');
const { Browser, Page } = puppeteer;
const casper_wasm_sdk = require('casper-wasm-sdk');
const { SDK, privateToPublicKey, Verbosity } = casper_wasm_sdk;
const fs = require('fs');
const path = require('path');
const keyName = 'secret_key.pem';
const keyPath = '../../../../NCTL/casper-node/utils/nctl/assets/net-1/users/user-1/';
let delete_key_at_root_after_test!: boolean;
let browser: typeof Browser;
let page: typeof Page;
let sdk: typeof SDK;
const node_address = 'http://localhost:11101';
const app_address = 'http://localhost:4200';
const chain_name = 'casper-net-1';
let private_key!: string;
let account!: string;
let account_hash!: string;
let block_height!: string;
let block_hash!: string;

describe('Angular App Tests', () => {
  beforeAll(async () => {
    setupFixtures();
    browser = await puppeteer.launch({ headless: 'new' });
    page = await browser.newPage();
    await page.goto(app_address);
    await page.setViewport({
      width: 1920,
      height: 1080,
    });
  });

  describe('Loading', () => {
    it('should have a title', async () => {
      const title = await page.title();
      expect(title).toBe('Casper Client');
    });

    it('should have a state_root_hash', async () => {
      await page.waitForSelector('[e2e-id="state_root_hash"]');
      const state_root_hash = await page.evaluate(() => {
        return document.querySelector('[e2e-id="state_root_hash"]')?.textContent;
      });
      const pattern = /^state root hash is [0-9a-f]{64}$/i;
      expect(state_root_hash).toMatch(pattern);
    });

    it('should have action to get_node_status by default', async () => {
      await page.waitForSelector('[e2e-id="selectActionElt"]');
      const action = await page.evaluate(() => {
        return (document.querySelector('[e2e-id="selectActionElt"]') as HTMLSelectElement).value;
      });
      expect(action).toBe('get_node_status');
    });

    it('should have chain_name and node_address', async () => {
      await page.waitForSelector('[e2e-id="selectActionElt"]');
      const chainname = await page.evaluate(() => {
        return document.querySelector('[e2e-id="chain_name"]')?.textContent;
      });
      const node_address = await page.evaluate(() => {
        return document.querySelector('[e2e-id="node_address"]')?.textContent;
      });
      expect(chainname).toBe(chain_name);
      expect(node_address).toBe(app_address);
    });

    it('should clear result', async () => {
      await page.waitForSelector('[e2e-id="clear"]');
      let result = await page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(result).toBeDefined();
      await clear();
      result = await page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(result).toBeUndefined();
    });

  });

  describe('Setting public key and get account info', () => {
    it('should set public key', async () => {
      await page.waitForSelector('[e2e-id="publicKeyElt"]');
      await clearInput('[e2e-id="publicKeyElt"]');
      await page.type('[e2e-id="publicKeyElt"]', account);
      await page.$eval('[e2e-id="publicKeyElt"]', (e: { blur: () => any; }) => e.blur());
      const account_input = await page.evaluate(() => {
        return (document.querySelector('[e2e-id="publicKeyElt"]') as HTMLInputElement).value;
      });
      const pattern = /^[0-9a-f]{66}$/i;
      expect(account_input).toMatch(pattern);
      await page.waitForSelector('[e2e-id="main_purse"]');
      await page.waitForSelector('[e2e-id="account_hash"]');
    });

    it('should have a main purse uref', async () => {
      await page.waitForSelector('[e2e-id="main_purse"]');
      const main_purse = await page.evaluate(() => {
        return document.querySelector('[e2e-id="main_purse"]')?.textContent;
      });
      const pattern = /^main purse is uref-[0-9a-f\-]{68}$/i;
      expect(main_purse).toMatch(pattern);
    });

    it('should have an account hash', async () => {
      await page.waitForSelector('[e2e-id="account_hash"]');
      const account_hash = await page.evaluate(() => {
        return document.querySelector('[e2e-id="account_hash"]')?.textContent;
      });
      const pattern = /^account hash is account-hash-[0-9a-f]{64}$/i;
      expect(account_hash).toMatch(pattern);
    });
  });

  describe('Rpc call get_account', () => {
    it('should get_account from public key', async () => {
      await clear();
      await seletAction('get_account');
      await page.waitForSelector('[e2e-id="accountIdentifierElt"]');
      await clearInput('[e2e-id="accountIdentifierElt"]');
      await page.type('[e2e-id="accountIdentifierElt"]', account);
      await submit();
      const result = await get_result();
      const pattern = /\"account-hash-[0-9a-f]{64}\"/i;
      expect(result).toMatch(pattern);
    });

    it('should get_account from account hash', async () => {
      await clear();
      await seletAction('get_account');
      await page.waitForSelector('[e2e-id="accountIdentifierElt"]');
      await clearInput('[e2e-id="accountIdentifierElt"]');
      await page.type('[e2e-id="accountIdentifierElt"]', account_hash);
      await submit();
      const result = await get_result();
      const pattern = new RegExp(`"${account_hash}"`, 'i');
      expect(result).toMatch(pattern);
    });

    it('should get_account from public key with block', async () => {
      await clear();
      await seletAction('get_account');
      await page.waitForSelector('[e2e-id="accountIdentifierElt"]');
      await clearInput('[e2e-id="accountIdentifierElt"]');
      await page.type('[e2e-id="accountIdentifierElt"]', account);
      await page.waitForSelector('[e2e-id="blockIdentifierHeightElt"]');
      await page.type('[e2e-id="blockIdentifierHeightElt"]', block_height);
      await submit();
      let result = await get_result();
      const pattern = /\"account-hash-[0-9a-f]{64}\"/i;
      expect(result).toMatch(pattern);
      await clear();
      await clearInput('[e2e-id="blockIdentifierHeightElt"]');
      await page.type('[e2e-id="blockIdentifierHashElt"]', block_hash);
      await submit();
      result = await get_result();
      expect(result).toMatch(pattern);
    });
  });

  xit('should load private key and set account', async () => {

    await delay(6000);

    const account_input = await page.evaluate(() => {
      return (document.querySelector('[e2e-id="publicKeyElt"]') as HTMLInputElement).value;
    });
    const pattern = /^[0-9a-f]{66}$/i;
    expect(account_input).toMatch(pattern);
  });

  afterAll(async () => {
    await browser.close();
    if (delete_key_at_root_after_test) {
      deleteFile(path.resolve(__dirname, keyName));
    }
  });
});

async function screen() {
  await page.screenshot({ path: "test.png" });
}

async function clear() {
  await page.waitForSelector('[e2e-id="clear"]');
  await page.click('[e2e-id="clear"]');
}

async function clearInput(id: string) {
  await page.$eval(id, (input: { value: string; }) => {
    input.value = '';
  });
}


async function get_result() {
  await page.waitForSelector('[e2e-id="result"]');
  const result = await page.evaluate(() => {
    return document.querySelector('[e2e-id="result"]')?.textContent;
  });
  expect(result).toBeDefined();
  return result;
}

async function submit() {
  await page.waitForSelector('[e2e-id="submit"]');
  await page.click('[e2e-id="submit"]');
}

async function seletAction(action: string) {
  await page.waitForSelector('[e2e-id="selectActionElt"]');
  await page.select('[e2e-id="selectActionElt"]', action);
  const action_selected = await page.evaluate(() => {
    return (document.querySelector('[e2e-id="selectActionElt"]') as HTMLSelectElement).value;
  });
  expect(action_selected).toBe(action);
}

async function setPrivateKey() {
  await page.waitForSelector('[e2e-id="privateKeyElt"]');
  const elementHandle = await page.$('[e2e-id="privateKeyElt"]');
  await elementHandle.uploadFile(path.resolve(__dirname, keyName));

}

function delay(time: number | undefined) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

async function setupFixtures() {
  sdk = new SDK();
  private_key = readPEMFile(`${keyPath}${keyName}`);
  account = privateToPublicKey(private_key);
  let public_key = new PublicKey(account);
  account_hash = public_key.toAccountHash().toFormattedString();
  get_block();
}

function readPEMFile(keyPath?: string): string {
  let pemFilePath = keyPath ? path.resolve(__dirname, keyPath) : null;
  delete_key_at_root_after_test = true;
  if (!pemFilePath || !fs.existsSync(pemFilePath)) {
    pemFilePath = path.resolve(__dirname, keyName);
    delete_key_at_root_after_test = false;
  }
  try {
    const data = fs.readFileSync(pemFilePath, 'utf8');
    const copyFilePath = path.resolve(__dirname, keyName);
    copyFile(pemFilePath, copyFilePath);
    return data;
  } catch (error) {
    console.error('Error:', error);
    return "";
  }
}

function copyFile(src: string, dest: string) {
  try {
    fs.copyFileSync(src, dest);
    console.info(`Copied ${src} to ${dest}`);
  } catch (error) {
    console.error(`Error copying ${src} to ${dest}:`, error);
  }
}
function deleteFile(filePathToDelete: string) {
  try {
    if (fs.existsSync(filePathToDelete)) {
      fs.unlinkSync(filePathToDelete);
      console.info(`Deleted file: ${filePathToDelete}`);
    } else {
      console.info(`File not found: ${filePathToDelete}`);
    }
  } catch (error) {
    console.error(`Error deleting file: ${filePathToDelete}`, error);
  }
}

async function get_block() {
  const chain_get_block_options: getBlockOptions = sdk.get_block_options({
    node_address
  });
  const block_result = await sdk.get_block(chain_get_block_options);
  block_hash = block_result?.block?.hash;
  block_height = block_result?.block?.header.height.toString();
}
