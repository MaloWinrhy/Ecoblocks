use crate::block::Block;
use mongodb::{bson, Database};
use std::{collections::HashMap, time::{SystemTime, UNIX_EPOCH}};

pub struct Tangle {
    pub blocks: HashMap<String, Block>,
    pub db: Database,
}

impl Tangle {
    pub async fn new(db: Database) -> Self {
        let mut tangle = Tangle { blocks: HashMap::new(), db };
        tangle.create_genesis_block().await;
        tangle
    }

    async fn create_genesis_block(&mut self) {
        let genesis_block = Block::new(0, current_time(), vec![], String::from("Genesis Block"), String::from("system"));
        self.blocks.insert(genesis_block.hash.clone(), genesis_block.clone());
        self.save_block(&genesis_block).await;
    }

    pub async fn add_block(&mut self, data: String, proposer_id: String) -> Result<(), String> {
        let previous_hashes = self.select_previous_blocks();
        let new_block = Block::new(
            self.blocks.len() as u64,
            current_time(),
            previous_hashes.clone(),
            data,
            proposer_id.clone(),
        );

        if self.validate_block(&new_block) {
            self.blocks.insert(new_block.hash.clone(), new_block.clone());
            self.save_block(&new_block).await;
            Ok(())
        } else {
            Err(String::from("Block validation failed"))
        }
    }

    fn select_previous_blocks(&self) -> Vec<String> {
        // Sélectionner deux blocs précédents de manière aléatoire ou selon une politique spécifique
        self.blocks.keys().take(2).cloned().collect()
    }

    fn validate_block(&self, block: &Block) -> bool {
        // Valider que les blocs précédents existent dans le Tangle
        for hash in &block.previous_hashes {
            if !self.blocks.contains_key(hash) {
                return false;
            }
        }
        true
    }

    async fn save_block(&self, block: &Block) {
        let collection = self.db.collection("blocks");
        let serialized_block = bson::to_bson(block).unwrap();
        if let bson::Bson::Document(document) = serialized_block {
            collection.insert_one(document, None).await.unwrap();
        }
    }
}

fn current_time() -> u64 {
    let start = SystemTime::now();
    let since_epoch = start.duration_since(UNIX_EPOCH).expect("Time went backwards");
    since_epoch.as_millis().try_into().unwrap()
}
