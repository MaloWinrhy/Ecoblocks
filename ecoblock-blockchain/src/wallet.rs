use std::collections::HashMap;
use rand::Rng;

pub struct Wallet {
    pub balances: HashMap<String, u64>,
}

impl Wallet {
    pub fn new() -> Self {
        Wallet {
            balances: HashMap::new(),
        }
    }


}
