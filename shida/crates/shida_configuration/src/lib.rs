mod environment_configuration;

use std::path::Path;

pub use environment_configuration::EnvironmentConfiguration;

pub trait Configuration {
    fn get_repl_path(&self) -> Option<&Path>;

    fn get_agent_path(&self) -> Option<&Path>;
}
