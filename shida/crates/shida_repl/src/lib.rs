mod repl_configuration;
mod repl_factory;

pub use repl_configuration::ReplConfiguration;
pub use repl_factory::ReplFactory;

use std::path::PathBuf;

pub struct Repl {
    path: PathBuf,
}

impl Repl {
    pub fn new(path: PathBuf) -> Self {
        tracing::info!("Initialized REPL at path '{}'", path.display());
        Self { path }
    }
}
