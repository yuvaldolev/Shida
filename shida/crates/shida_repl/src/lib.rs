mod repl_configuration;
mod repl_factory;

use std::path::PathBuf;

pub use repl_configuration::ReplConfiguration;
pub use repl_factory::ReplFactory;

pub struct Repl {
    path: PathBuf,
}

impl Repl {
    pub fn new(path: PathBuf) -> Self {
        tracing::info!("Initialized REPL at path '{}'", path.display());
        Self { path }
    }
}
