mod agent_configuration;
mod agent_factory;

pub use agent_configuration::AgentConfiguration;
pub use agent_factory::AgentFactory;

use std::path::PathBuf;

pub struct Agent {
    path: PathBuf,
}

impl Agent {
    pub fn new(path: PathBuf) -> Self {
        tracing::info!("Initialized agent at path '{}'", path.display());
        Self { path }
    }
}
