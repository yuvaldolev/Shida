mod repl_factory;

use std::path::PathBuf;

pub use repl_factory::ReplFactory;

pub struct Repl {
    path: PathBuf,
}

impl Repl {
    pub fn new(path: PathBuf) -> Self {
        Self { path }
    }
}
