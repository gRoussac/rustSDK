#[cfg(test)]
pub(crate) const DEPLOY_MOCK: &str = r#"
{
  "TransactionProcessed": {
    "transaction_hash": {
      "Deploy": "19dbf9bdcd821e55392393c74c86deede02d9434d62d0bc72ab381ce7ea1c4f2"
    },
    "initiator_addr": {
      "PublicKey": "0109016beb0dbac17f21f339375da8f0b0a5e29feb93562f9fd269cef97c0467e0"
    },
    "timestamp": "2024-05-20T16:13:32.000Z",
    "ttl": "30m",
    "block_hash": "22f826f424eca2fe1656c53d8071e6ec7d4da57dd2df267460b4746531234275",
    "execution_result": {
      "Version2": {
        "initiator": {
          "PublicKey": "0109016beb0dbac17f21f339375da8f0b0a5e29feb93562f9fd269cef97c0467e0"
        },
        "error_message": null,
        "limit": "500000000000",
        "consumed": "80564620",
        "cost": "500000000000",
        "payment": [],
        "transfers": [],
        "size_estimate": 10018,
        "effects": [
          {
            "key": "balance-hold-0119984e19cfb0010aa705e388bd9a87a48b44df0d310405cfde326f097409c7cf4699c7968f010000",
            "kind": {
              "Write": {
                "CLValue": {
                  "cl_type": "U512",
                  "bytes": "050088526a74",
                  "parsed": "500000000000"
                }
              }
            }
          },
          {
            "key": "uref-4da01982078dd40eb73130eb50c5ff2f60a95d77d7d8bfee30041628e6cddc3f-000",
            "kind": {
              "Write": {
                "CLValue": {
                  "cl_type": "String",
                  "bytes": "0c00000048656c6c6f20436173706572",
                  "parsed": "Hello Casper"
                }
              }
            }
          },
          {
            "key": "named-key-entity-account-9ae55d8280ff043179f72f75bae705d35853c13fabb159149ea3d8aa5cdf0363-71c07bb3b88db9005737cd3078806ed924a8a0cfbd88ac4732b90fedea0e299b",
            "kind": "Identity"
          },
          {
            "key": "named-key-entity-account-9ae55d8280ff043179f72f75bae705d35853c13fabb159149ea3d8aa5cdf0363-71c07bb3b88db9005737cd3078806ed924a8a0cfbd88ac4732b90fedea0e299b",
            "kind": {
              "Prune": "named-key-entity-account-9ae55d8280ff043179f72f75bae705d35853c13fabb159149ea3d8aa5cdf0363-71c07bb3b88db9005737cd3078806ed924a8a0cfbd88ac4732b90fedea0e299b"
            }
          },
          {
            "key": "named-key-entity-account-9ae55d8280ff043179f72f75bae705d35853c13fabb159149ea3d8aa5cdf0363-71c07bb3b88db9005737cd3078806ed924a8a0cfbd88ac4732b90fedea0e299b",
            "kind": {
              "Write": {
                "NamedKey": {
                  "named_key": {
                    "cl_type": "Key",
                    "bytes": "024da01982078dd40eb73130eb50c5ff2f60a95d77d7d8bfee30041628e6cddc3f07",
                    "parsed": "uref-4da01982078dd40eb73130eb50c5ff2f60a95d77d7d8bfee30041628e6cddc3f-007"
                  },
                  "name": {
                    "cl_type": "String",
                    "bytes": "0e000000746573745f68656c6c6f5f6b6579",
                    "parsed": "test_hello_key"
                  }
                }
              }
            }
          },
          {
            "key": "balance-hold-0119984e19cfb0010aa705e388bd9a87a48b44df0d310405cfde326f097409c7cf4699c7968f010000",
            "kind": {
              "Prune": "balance-hold-0119984e19cfb0010aa705e388bd9a87a48b44df0d310405cfde326f097409c7cf4699c7968f010000"
            }
          },
          {
            "key": "balance-hold-0019984e19cfb0010aa705e388bd9a87a48b44df0d310405cfde326f097409c7cf4699c7968f010000",
            "kind": {
              "Write": {
                "CLValue": {
                  "cl_type": "U512",
                  "bytes": "050088526a74",
                  "parsed": "500000000000"
                }
              }
            }
          }
        ]
      }
    },
    "messages": [
      {
        "entity_hash": "entity-system-fbd35eaf71f295b3bf35a295e705f629bbea28cefedfc109eda1205fb3650bad",
        "message": {
          "String": "cs5rHI2Il75nRJ7GLs7BQM5CilvzMqu0dgFuj57FkqEs3431LJ1qfsZActb05hzR"
        },
        "topic_name": "7DnsHE3NL4PRaYuPcY90bECdnd7D78lF",
        "topic_name_hash": "f75840ed75ad1c85856de00d2ca865a7608b46a933d81c64ff8907ec620d6e83",
        "topic_index": 2222189259,
        "block_index": 11650550294672125610
      }
    ]
  }
}
id:1346"#;
