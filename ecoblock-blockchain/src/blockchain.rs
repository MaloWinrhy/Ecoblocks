use std::time::{SystemTime, UNIX_EPOCH};

use crate::block::Block;

pub struct Blockchain {
    pub chain: Vec<Block>,
}

impl Blockchain {
    pub fn new() -> Self {
        let mut blockchain = Blockchain { chain: Vec::new() };
        blockchain.create_genesis_block();
        blockchain
    }

    fn create_genesis_block(&mut self) {
        let genesis_block = Block::new(0, current_time(), String::from("0"), String::from("Genesis Block"));
        self.chain.push(genesis_block);
    }

}

fn current_time() -> u128 {
    let start = SystemTime::now();
    let since_epoch = start.duration_since(UNIX_EPOCH).expect("Time went backwards");
    since_epoch.as_millis()
}
