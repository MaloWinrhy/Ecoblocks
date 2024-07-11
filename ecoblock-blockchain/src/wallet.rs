use std::collections::HashMap;
use bip39::{Language, Mnemonic, MnemonicType};
use sha2::{Sha256, Digest};
use mongodb::{bson::{doc, Document}, Database};
use mongodb::options::FindOptions;
use futures::stream::StreamExt;

pub struct Wallet {
    pub balances: HashMap<String, u64>,
    db: Database,
}

impl Wallet {
    pub fn new(db: Database) -> Self {
        Wallet {
            balances: HashMap::new(),
            db,
        }
    }

    pub fn generate_passphrase() -> String {
        let mnemonic = Mnemonic::new(MnemonicType::Words12, Language::English);
        mnemonic.phrase().to_string()
    }

    pub fn generate_address_from_passphrase(passphrase: &str) -> String {
        let mut hasher = Sha256::new();
        hasher.update(passphrase.as_bytes());
        format!("{:x}", hasher.finalize())
    }

    pub async fn create_wallet_with_passphrase(&mut self) -> (String, String) {
        let passphrase = Wallet::generate_passphrase();
        let address = Wallet::generate_address_from_passphrase(&passphrase);
        self.balances.insert(address.clone(), 0);
        self.save_wallet(&address).await;
        (passphrase, address)
    }

    pub async fn credit(&mut self, address: &String, amount: u64) {
        let balance = self.balances.entry(address.clone()).or_insert(0);
        *balance += amount;
        self.save_wallet(address).await;
    }

    pub async fn debit(&mut self, address: &String, amount: u64) -> Result<(), String> {
        let balance = self.balances.entry(address.clone()).or_insert(0);
        if *balance >= amount {
            *balance -= amount;
            self.save_wallet(address).await;
            Ok(())
        } else {
            Err(String::from("Insufficient balance"))
        }
    }

    pub async fn save_wallet(&self, address: &String) {
        let collection: mongodb::Collection<Document> = self.db.collection("wallets");
        let balance = self.balances.get(address).cloned().unwrap_or(0);
        let document = doc! {
            "address": address.clone(),
            "balance": balance as i64
        };
        collection.replace_one(doc! { "address": address }, document, None).await.unwrap();
    }

    pub async fn load_wallets(&mut self) {
        let collection: mongodb::Collection<Document> = self.db.collection("wallets");
        let find_options = FindOptions::builder().build();
        let mut cursor = collection.find(None, find_options).await.unwrap();

        while let Some(result) = cursor.next().await {
            if let Ok(document) = result {
                let address = document.get_str("address").unwrap().to_string();
                let balance = document.get_i64("balance").unwrap() as u64;
                self.balances.insert(address, balance);
            }
        }
    }
}
