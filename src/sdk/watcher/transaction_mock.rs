#[cfg(test)]
pub(crate) const TRANSACTION_MOCK: &str = r#"
{
  "TransactionProcessed": {
    "transaction_hash": {
      "Version1": "8c6823d9480eee9fe0cfb5ed1fbf77f928cc6af21121298c05b4e3d87a328271"
    },
    "initiator_addr": {
      "PublicKey": "019f23800dbf3d5e4f18b1b7b69e575bdddd92b06ae40c12372d1e7d109c06c327"
    },
    "timestamp": "2024-06-08T13:27:13.000Z",
    "ttl": "30m",
    "block_hash": "4ed26b466098bc1e10d3585fdf1957bc4f6ee088853401d6c6312a169b54fa51",
    "execution_result": {
      "Version2": {
        "initiator": {
          "PublicKey": "019f23800dbf3d5e4f18b1b7b69e575bdddd92b06ae40c12372d1e7d109c06c327"
        },
        "error_message": null,
        "limit": "100000000000",
        "consumed": "81647240",
        "cost": "100000000000",
        "payment": [],
        "transfers": [],
        "size_estimate": 24222,
        "effects": [
          {
            "key": "balance-hold-01e5787dae0ea07bcebf392bb68f9b143eb2d2dc57f22788e44bf5a4ed693b9dd1463208f88f010000",
            "kind": {
              "Write": {
                "CLValue": {
                  "cl_type": "U512",
                  "bytes": "0500e8764817",
                  "parsed": "100000000000"
                }
              }
            }
          },
          {
            "key": "uref-86db755267b8871a09e915132f85b3c7a915ac6ea261da1cb27e1f172f8850de-000",
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
            "key": "named-key-entity-account-0e289d20a3c976030c35d56f331a25fd41f499d6289ba9e41438cfa67ee50e30-71c07bb3b88db9005737cd3078806ed924a8a0cfbd88ac4732b90fedea0e299b",
            "kind": {
              "Write": {
                "NamedKey": {
                  "named_key": {
                    "cl_type": "Key",
                    "bytes": "0286db755267b8871a09e915132f85b3c7a915ac6ea261da1cb27e1f172f8850de07",
                    "parsed": "uref-86db755267b8871a09e915132f85b3c7a915ac6ea261da1cb27e1f172f8850de-007"
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
            "key": "balance-hold-01e5787dae0ea07bcebf392bb68f9b143eb2d2dc57f22788e44bf5a4ed693b9dd1463208f88f010000",
            "kind": {
              "Prune": "balance-hold-01e5787dae0ea07bcebf392bb68f9b143eb2d2dc57f22788e44bf5a4ed693b9dd1463208f88f010000"
            }
          },
          {
            "key": "balance-hold-00e5787dae0ea07bcebf392bb68f9b143eb2d2dc57f22788e44bf5a4ed693b9dd1463208f88f010000",
            "kind": {
              "Write": {
                "CLValue": {
                  "cl_type": "U512",
                  "bytes": "0500e8764817",
                  "parsed": "100000000000"
                }
              }
            }
          },
          {
            "key": "entity-system-e7d3d1cc91fc89803c9418bf4654c9bacfb56404a8082b418f792d0ba81f3067",
            "kind": "Identity"
          },
          {
            "key": "entity-system-68ea1764cc0e9e3247ea69836e2c18895c300b32ca20ee2ab74046b5e23bfc78",
            "kind": "Identity"
          },
          {
            "key": "entity-system-2ef6edaecb0a0dda13a5c198e38f0c2e6bb686420dc4b8399398ae5856a12709",
            "kind": "Identity"
          },
          {
            "key": "bid-addr-01ace4b425d8e18e6480e9d95afbf7a879a712ff4c73b21fb422db775e1a66036e",
            "kind": "Identity"
          },
          {
            "key": "bid-addr-04ace4b425d8e18e6480e9d95afbf7a879a712ff4c73b21fb422db775e1a66036e7d06000000000000",
            "kind": {
              "Write": {
                "BidKind": {
                  "Credit": {
                    "validator_public_key": "01f75e3a62ba40612fd11c6d6c704e41a67e066ada4b4c23c4e6c2e595ee2b39c4",
                    "era_id": 1661,
                    "amount": "100000000000"
                  }
                }
              }
            }
          }
        ]
      }
    },
    "messages": []
  }
}
id:1346"#;
