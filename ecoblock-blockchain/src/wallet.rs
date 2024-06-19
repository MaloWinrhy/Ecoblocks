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

    pub fn generate_address() -> String {
        let mut rng = rand::thread_rng();
        (0..32).map(|_| rng.gen_range(0..10).to_string()).collect()
    }

    pub fn credit(&mut self, address: &String, amount: u64) {
        let balance = self.balances.entry(address.clone()).or_insert(0);
        *balance += amount;
    }

    pub fn debit(&mut self, address: &String, amount: u64) -> Result<(), String> {
        let balance = self.balances.entry(address.clone()).or_insert(0);
        if *balance >= amount {
            *balance -= amount;
            Ok(())
        } else {
            Err(String::from("Insufficient balance"))
        }
    }
}
