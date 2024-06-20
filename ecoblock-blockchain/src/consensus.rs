use crate::block::Block;

pub struct Consensus;

impl Consensus {
    pub fn validate_block(block: &Block) -> bool {
        !block.previous_hashes.is_empty()
    }
}
