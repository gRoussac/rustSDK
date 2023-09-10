import { PublicKey, error, getBlockOptions } from "../node_modules/casper-wasm-sdk/casper_wasm_sdk";

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
let target!: string;
let block_height!: string;
let block_hash!: string;
let payment_amount = '5500000000';
let transfer_amount = '2500000000';
let entrypoint = "mint";
let args_simple =
  "joe:bool='true',bob:bool='false'";
let args_json = `[
{"name": "collection_name", "type": "String", "value": "enhanced-nft-1"},
{"name": "collection_symbol", "type": "String", "value": "ENFT-1"},
{"name": "total_token_supply", "type": "U64", "value": 10},
{"name": "ownership_mode", "type": "U8", "value": 0},
{"name": "nft_kind", "type": "U8", "value": 1},
{"name": "json_schema", "type": "String", "value": "nft-schema"},
{"name": "allow_minting", "type": "Bool", "value": true},
{"name": "owner_reverse_lookup_mode", "type": "U8", "value": 0},
{"name": "nft_metadata_kind", "type": "U8", "value": 2},
{"name": "identifier_mode", "type": "U8", "value": 0},
{"name": "metadata_mutability", "type": "U8", "value": 1}
]`;

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
    page
      .on('console', (message: { type: () => string; text: () => any; }) =>
        console.log(`${message.type().substr(0, 3).toUpperCase()} ${message.text()}`))
      .on('pageerror', (message: any) => console.log(message))
      .on('requestfailed', (request: { failure: () => { (): any; new(): any; errorText: any; }; url: () => any; }) =>
        console.log(`${request.failure().errorText} ${request.url()}`));
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
      await get_result();
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

    beforeAll(async () => {
      await seletAction('get_account');
    });

    beforeEach(async () => {
      await clear();
    });

    it('should get_account from public key', async () => {
      await page.waitForSelector('[e2e-id="accountIdentifierElt"]');
      await clearInput('[e2e-id="accountIdentifierElt"]');
      await page.type('[e2e-id="accountIdentifierElt"]', account);
      await submit();
      const result = await get_result();
      const pattern = /\"account-hash-[0-9a-f]{64}\"/i;
      expect(result).toMatch(pattern);
    });

    it('should get_account from account hash', async () => {
      await page.waitForSelector('[e2e-id="accountIdentifierElt"]');
      await clearInput('[e2e-id="accountIdentifierElt"]');
      await page.type('[e2e-id="accountIdentifierElt"]', account_hash);
      await submit();
      const result = await get_result();
      const pattern = new RegExp(`"${account_hash}"`, 'i');
      expect(result).toMatch(pattern);
    });

    it('should get_account from public key with block', async () => {
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

  describe('Rpc call get_auction_info', () => {
    beforeEach(async () => {
      await clear();
      await seletAction('get_auction_info');
    });
    xit('should get_auction_info', async () => {
      await submit();
      await get_result();
    });
  });

  describe('Rpc call get_balance', () => {
    beforeAll(async () => {
      await page.waitForSelector('[e2e-id="publicKeyElt"]');
      await clearInput('[e2e-id="publicKeyElt"]');
      await page.type('[e2e-id="publicKeyElt"]', account);
      await page.$eval('[e2e-id="publicKeyElt"]', (e: { blur: () => any; }) => e.blur());
      await page.waitForSelector('[e2e-id="main_purse"]');
      await seletAction('get_balance');
      await page.waitForSelector('[e2e-id="purseUrefElt"]');
      await page.waitForSelector('[e2e-id="stateRootHashElt"]');
    });

    beforeEach(async () => {
      await clear();
    });

    it('should get_balance with state root hash', async () => {
      let main_purse = await page.evaluate(() => {
        return (document.querySelector('[e2e-id="purseUrefElt"]') as HTMLInputElement).value;
      });
      expect(main_purse).toBeDefined();
      await submit();
      await get_result();
    });

    it('should get_balance without state root hash', async () => {
      await page.waitForSelector('[e2e-id="stateRootHashElt"]');
      await clearInput('[e2e-id="stateRootHashElt"]');
      let main_purse = await page.evaluate(() => {
        return (document.querySelector('[e2e-id="purseUrefElt"]') as HTMLInputElement).value;
      });
      expect(main_purse).toBeDefined();
      await submit();
      await get_result();
    });
  });

  describe('Rpc call get_block', () => {
    beforeAll(async () => {
      await seletAction('get_block');
    });

    beforeEach(async () => {
      await clear();
    });
    it('should get_block', async () => {

      await submit();
      await get_result();
    });

    it('should get_block with block height', async () => {
      await page.waitForSelector('[e2e-id="blockIdentifierHeightElt"]');
      await clearInput('[e2e-id="blockIdentifierHeightElt"]');
      await page.type('[e2e-id="blockIdentifierHeightElt"]', block_height);
      await submit();
      await get_result();
    });

    it('should get_block with block hash', async () => {
      await clearInput('[e2e-id="blockIdentifierHeightElt"]');
      await clearInput('[e2e-id="blockIdentifierHashElt"]');
      await page.type('[e2e-id="blockIdentifierHashElt"]', block_hash);
      await submit();
      await get_result();
    });
  });

  describe('Rpc call get_block_transfers', () => {
    beforeAll(async () => {
      await seletAction('get_block_transfers');
    });

    beforeEach(async () => {
      await clear();
    });

    it('should get_block_transfers', async () => {
      await submit();
      await get_result();
    });

    it('should get_block_transfers with block height', async () => {
      await page.waitForSelector('[e2e-id="blockIdentifierHeightElt"]');
      await clearInput('[e2e-id="blockIdentifierHeightElt"]');
      await page.type('[e2e-id="blockIdentifierHeightElt"]', block_height);
      await submit();
      await get_result();
    });

    it('should get_block_transfers with block hash', async () => {
      await clearInput('[e2e-id="blockIdentifierHeightElt"]');
      await clearInput('[e2e-id="blockIdentifierHashElt"]');
      await page.type('[e2e-id="blockIdentifierHashElt"]', block_hash);
      await submit();
      await get_result();
    });
  });

  describe('Rpc call get_chainspec', () => {
    beforeAll(async () => {
      await seletAction('get_chainspec');
    });
    beforeEach(async () => {
      await clear();
    });
    it('should get_chainspec', async () => {
      let result_text = await page.evaluate(() => {
        return document.querySelector('[e2e-id="result_text"]')?.textContent;
      });
      expect(result_text).toBeUndefined();
      await submit();
      await page.waitForSelector('[e2e-id="result_text"]');
      const result = await page.evaluate(() => {
        return document.querySelector('[e2e-id="result_text"]')?.textContent;
      });
      expect(result).toBeDefined();
    });
  });

  describe('Rpc call get_deploy', () => {
    beforeAll(async () => {
      await seletAction('get_deploy');
    });

    beforeEach(async () => {
      await clear();
    });

    xit('should get_deploy', async () => {
      await page.waitForSelector('[e2e-id="deployHashElt"]');
      await clearInput('[e2e-id="deployHashElt"]');
      const deploy = '';
      await page.type('[e2e-id="deployHashElt"]', deploy);
      await submit();
      await get_result();
    });
  });

  describe('Rpc call get_era_info', () => {
    beforeAll(async () => {
      await seletAction('get_era_info');
    });
    beforeEach(async () => {
      await clear();
    });
    it('should get_era_info', async () => {
      await submit();
      await get_result();
    });

    it('should get_era_info with block height', async () => {
      await seletAction('get_era_info');
      await page.waitForSelector('[e2e-id="blockIdentifierHeightElt"]');
      await clearInput('[e2e-id="blockIdentifierHeightElt"]');
      await page.type('[e2e-id="blockIdentifierHeightElt"]', block_height);
      await submit();
      await get_result();
    });

    it('should get_era_info with block hash', async () => {
      await seletAction('get_era_info');
      await clearInput('[e2e-id="blockIdentifierHeightElt"]');
      await clearInput('[e2e-id="blockIdentifierHashElt"]');
      await page.type('[e2e-id="blockIdentifierHashElt"]', block_hash);
      await submit();
      await get_result();
    });
  });

  describe('Rpc call get_era_summary', () => {
    beforeAll(async () => {
      await seletAction('get_era_summary');
    });
    beforeEach(async () => {
      await clear();
    });
    it('should get_era_summary', async () => {
      await seletAction('get_era_summary');
      await submit();
      await get_result();
    });

    it('should get_era_summary with block height', async () => {
      await seletAction('get_era_summary');
      await page.waitForSelector('[e2e-id="blockIdentifierHeightElt"]');
      await clearInput('[e2e-id="blockIdentifierHeightElt"]');
      await page.type('[e2e-id="blockIdentifierHeightElt"]', block_height);
      await submit();
      await get_result();
    });

    it('should get_era_summary with block hash', async () => {
      await seletAction('get_era_summary');
      await clearInput('[e2e-id="blockIdentifierHeightElt"]');
      await clearInput('[e2e-id="blockIdentifierHashElt"]');
      await page.type('[e2e-id="blockIdentifierHashElt"]', block_hash);
      await submit();
      await get_result();
    });
  });

  describe('Rpc call get_node_status', () => {
    beforeAll(async () => {
      await seletAction('get_node_status');
    });
    beforeEach(async () => {
      await clear();
    });
    it('should get_node_status', async () => {
      await submit();
      await get_result();
    });
  });

  describe('Rpc call get_peers', () => {
    beforeAll(async () => {
      await seletAction('get_peers');
    });
    beforeEach(async () => {
      await clear();
    });
    it('should get_peers', async () => {
      let peers = await page.evaluate(() => {
        return document.querySelector('[e2e-id="peers"]')?.textContent;
      });
      expect(peers).toBeUndefined();
      await submit();
      await page.waitForSelector('[e2e-id="peers"]');
      peers = await page.evaluate(() => {
        return document.querySelector('[e2e-id="peers"]')?.textContent;
      });
      expect(peers).toBeDefined();
    });
  });

  describe('Rpc call get_state_root_hash', () => {
    beforeAll(async () => {
      await seletAction('get_state_root_hash');
    });
    beforeEach(async () => {
      await clear();
    });
    it('should get_state_root_hash', async () => {
      await submit();
      await get_result();
    });
  });

  describe('Rpc call get_validator_changes', () => {
    beforeAll(async () => {
      await seletAction('get_validator_changes');
    });
    beforeEach(async () => {
      await clear();
    });
    it('should get_validator_changes', async () => {
      await submit();
      await get_result();
    });
  });

  describe('Rpc call list_rpcs', () => {
    beforeAll(async () => {
      await seletAction('list_rpcs');
    });
    beforeEach(async () => {
      await clear();
    });
    it('should list_rpcs', async () => {
      await submit();
      await get_result();
    });
  });

  describe('Rpc call query_balance', () => {
    beforeAll(async () => {
      await page.waitForSelector('[e2e-id="publicKeyElt"]');
      await clearInput('[e2e-id="publicKeyElt"]');
      await page.type('[e2e-id="publicKeyElt"]', account);
      await page.$eval('[e2e-id="publicKeyElt"]', (e: { blur: () => any; }) => e.blur());
      await page.waitForSelector('[e2e-id="main_purse"]');
      await seletAction('query_balance');
      await page.waitForSelector('[e2e-id="stateRootHashElt"]');
      await page.waitForSelector('[e2e-id="purseIdentifierElt"]');
    });

    beforeEach(async () => {
      await clear();
    });

    it('should query_balance with purse identifier', async () => {
      await submit();
      await get_result();
    });

    it('should query_balance without state root hash', async () => {
      await clearInput('[e2e-id="stateRootHashElt"]');
      await submit();
      await get_result();
    });

    it('should query_balance with public key', async () => {
      await clearInput('[e2e-id="purseIdentifierElt"]');
      await page.type('[e2e-id="purseIdentifierElt"]', account);
      await submit();
      await get_result();
    });

    it('should query_balance with account hash', async () => {
      await clearInput('[e2e-id="purseIdentifierElt"]');
      await page.type('[e2e-id="purseIdentifierElt"]', account_hash);
      await submit();
      await get_result();
    });

    it('should query_balance with block height', async () => {
      await page.waitForSelector('[e2e-id="blockIdentifierHeightElt"]');
      await clearInput('[e2e-id="blockIdentifierHeightElt"]');
      await page.type('[e2e-id="blockIdentifierHeightElt"]', block_height);
      await submit();
      await get_result();
    });

    it('should query_balance with block hash', async () => {
      await clearInput('[e2e-id="blockIdentifierHeightElt"]');
      await clearInput('[e2e-id="blockIdentifierHashElt"]');
      await page.type('[e2e-id="blockIdentifierHashElt"]', block_hash);
      await submit();
      await get_result();
    });
  });

  describe('Deploy util make_deploy', () => {
    beforeAll(async () => {

    });
    beforeEach(async () => {
      await page.reload();
      await clear();
      await page.waitForSelector('[e2e-id="publicKeyElt"]');
      await clearInput('[e2e-id="publicKeyElt"]');
      await page.type('[e2e-id="publicKeyElt"]', account);
      await page.$eval('[e2e-id="publicKeyElt"]', (e: { blur: () => any; }) => e.blur());
      await page.waitForSelector('[e2e-id="main_purse"]');
      await seletAction('make_deploy');
      await page.waitForSelector('[e2e-id="paymentAmountElt"]');
      await page.waitForSelector('[e2e-id="sessionHashElt"]');
      await page.waitForSelector('[e2e-id="entryPointElt"]');
      await page.waitForSelector('[e2e-id="argsSimpleElt"]');
      await page.waitForSelector('[e2e-id="argsJsonElt"]');
    });
    it('should make_deploy with contract hash', async () => {
      await page.type('[e2e-id="paymentAmountElt"]', payment_amount);
      await page.type('[e2e-id="sessionHashElt"]', "9d0235fe7f4ac6ba71cf251c68fdd945ecf449d0b8aecb66ab0cbc18e80b3477");
      await page.type('[e2e-id="entryPointElt"]', entrypoint);
      let make_deploy = await page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_deploy).toBeUndefined();
      await submit();
      await page.waitForSelector('[e2e-id="result"]');
      make_deploy = await page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_deploy).toBeDefined();
    });

    it('should make_deploy with contract name', async () => {
      await page.type('[e2e-id="paymentAmountElt"]', payment_amount);
      await page.waitForSelector('[e2e-id="sessionNameElt"]');
      await page.type('[e2e-id="sessionNameElt"]', "enhanced-nft-1");
      await page.type('[e2e-id="entryPointElt"]', entrypoint);
      let make_deploy = await page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_deploy).toBeUndefined();
      await submit();
      await page.waitForSelector('[e2e-id="result"]');
      make_deploy = await page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_deploy).toBeDefined();
    });

    it('should make_deploy with contract hash and args simple', async () => {
      await page.type('[e2e-id="paymentAmountElt"]', payment_amount);
      await page.type('[e2e-id="sessionHashElt"]', "9d0235fe7f4ac6ba71cf251c68fdd945ecf449d0b8aecb66ab0cbc18e80b3477");
      await page.type('[e2e-id="entryPointElt"]', entrypoint);
      await page.type('[e2e-id="argsSimpleElt"]', args_simple);
      let make_deploy = await page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_deploy).toBeUndefined();
      await submit();
      await page.waitForSelector('[e2e-id="result"]');
      make_deploy = await page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_deploy).toBeDefined();
    });

    it('should make_deploy with contract hash and args json', async () => {
      await page.type('[e2e-id="paymentAmountElt"]', payment_amount);
      await page.type('[e2e-id="sessionHashElt"]', "9d0235fe7f4ac6ba71cf251c68fdd945ecf449d0b8aecb66ab0cbc18e80b3477");
      await page.type('[e2e-id="entryPointElt"]', entrypoint);
      await page.type('[e2e-id="argsJsonElt"]', args_json);
      let make_deploy = await page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_deploy).toBeUndefined();
      await submit();
      await page.waitForSelector('[e2e-id="result"]');
      make_deploy = await page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_deploy).toBeDefined();
    });

    it('should make_deploy with package hash and args simple', async () => {
      await page.type('[e2e-id="paymentAmountElt"]', payment_amount);
      await page.type('[e2e-id="sessionHashElt"]', "9d0235fe7f4ac6ba71cf251c68fdd945ecf449d0b8aecb66ab0cbc18e80b3477");
      await page.type('[e2e-id="entryPointElt"]', entrypoint);
      await page.type('[e2e-id="argsSimpleElt"]', args_simple);
      await page.waitForSelector('[e2e-id="callPackageElt"]');
      await page.click('[e2e-id="callPackageElt"]');
      await page.waitForSelector('[e2e-id="versionElt"]');
      await page.type('[e2e-id="versionElt"]', "1");
      let make_deploy = await page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_deploy).toBeUndefined();
      await submit();
      await page.waitForSelector('[e2e-id="result"]');
      make_deploy = await page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_deploy).toBeDefined();
    });

    it('should make_deploy without TTL', async () => {
      await clearInput('[e2e-id="TTLElt"]');
      await page.type('[e2e-id="paymentAmountElt"]', payment_amount);
      await page.type('[e2e-id="sessionHashElt"]', "9d0235fe7f4ac6ba71cf251c68fdd945ecf449d0b8aecb66ab0cbc18e80b3477");
      await page.type('[e2e-id="entryPointElt"]', entrypoint);
      let make_deploy = await page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_deploy).toBeUndefined();
      await submit();
      await page.waitForSelector('[e2e-id="result"]');
      make_deploy = await page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_deploy).toBeDefined();
    });
  });

  describe('Deploy util make_transfer', () => {
    beforeAll(async () => {

    });
    beforeEach(async () => {
      await page.reload();
      await clear();
      await page.waitForSelector('[e2e-id="publicKeyElt"]');
      await clearInput('[e2e-id="publicKeyElt"]');
      await page.type('[e2e-id="publicKeyElt"]', account);
      await page.$eval('[e2e-id="publicKeyElt"]', (e: { blur: () => any; }) => e.blur());
      await page.waitForSelector('[e2e-id="main_purse"]');
      await seletAction('make_transfer');
      await page.waitForSelector('[e2e-id="transferAmountElt"]');
      await page.waitForSelector('[e2e-id="targetAccountElt"]');
    });

    it('should make_transfer', async () => {
      await page.type('[e2e-id="transferAmountElt"]', transfer_amount);
      await page.type('[e2e-id="targetAccountElt"]', target);
      let make_transfer = await page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_transfer).toBeUndefined();
      await submit();
      await page.waitForSelector('[e2e-id="result"]');
      make_transfer = await page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_transfer).toBeDefined();
    });

    it('should make_transfer without TTL', async () => {
      await clearInput('[e2e-id="TTLElt"]');
      await page.type('[e2e-id="transferAmountElt"]', transfer_amount);
      await page.type('[e2e-id="targetAccountElt"]', target);
      let make_transfer = await page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_transfer).toBeUndefined();
      await submit();
      await page.waitForSelector('[e2e-id="result"]');
      make_transfer = await page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_transfer).toBeDefined();
    });
  });

  describe('Deploy util sign_deploy', () => {
    beforeAll(async () => {

    });
    beforeEach(async () => {
      await page.reload();
      await clear();
      await page.waitForSelector('[e2e-id="publicKeyElt"]');
      await clearInput('[e2e-id="publicKeyElt"]');
      await page.type('[e2e-id="publicKeyElt"]', account);
      await page.$eval('[e2e-id="publicKeyElt"]', (e: { blur: () => any; }) => e.blur());
      await page.waitForSelector('[e2e-id="main_purse"]');
      await seletAction('make_transfer');
      await page.waitForSelector('[e2e-id="transferAmountElt"]');
      await page.waitForSelector('[e2e-id="targetAccountElt"]');
    });

    it('should sign_deploy', async () => {
      await page.type('[e2e-id="transferAmountElt"]', transfer_amount);
      await page.type('[e2e-id="targetAccountElt"]', target);
      let make_transfer = await page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_transfer).toBeUndefined();
      await submit();
      await page.waitForSelector('[e2e-id="result"]');
      make_transfer = await page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_transfer).toBeDefined();
      await seletAction('sign_deploy');
      const unsigned_deploy = await page.evaluate(() => {
        return document.querySelector('[e2e-id="deployJsonElt"]')?.textContent;
      });
      expect(unsigned_deploy).toContain(`"approvals": []`);
      setPrivateKey();
      await sign();
      const signed_deploy = await page.evaluate(() => {
        return document.querySelector('[e2e-id="deployJsonElt"]')?.textContent;
      });
      expect(signed_deploy).not.toContain(`"approvals": []`);
      await screen();
    });



  });

  xit('should load private key and set account', async () => {
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
  let result = await page.evaluate(() => {
    return document.querySelector('[e2e-id="result"]')?.textContent;
  });
  expect(result).toBeUndefined();
}

async function clearInput(id: string) {
  await page.waitForSelector(id);
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

async function sign() {
  await page.waitForSelector('[e2e-id="sign"]');
  await page.click('[e2e-id="sign"]');
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
  if (!account) {
    console.error('Missing account');
  }
  let public_key = new PublicKey(account);
  if (!public_key) {
    console.error('Missing public_key');
  }
  account_hash = public_key.toAccountHash().toFormattedString();
  get_block();
  if (!account_hash) {
    console.error('Missing account_hash');
  }
  const keyPath_target = keyPath.replace('user-1', 'user-2');
  const private_key_target = readPEMFile(`${keyPath_target}${keyName}`);
  target = privateToPublicKey(private_key_target);
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
