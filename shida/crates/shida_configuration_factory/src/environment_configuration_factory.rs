use std::{env, path::PathBuf};

use shida::ShidaConfiguration;
use shida_data_directory::DataDirectoryConfiguration;
use shida_repl::ReplConfiguration;

use crate::ConfigurationFactory;

const SHIDA_DATA_DIRECTORY_ENVIRONMENT_VARIABLE: &str = "SHIDA_DATA_DIRECTORY";
const SHIDA_REPL_ENVIRONMENT_VARIABLE: &str = "SHIDA_REPL";
// const AGENT_PATH_ENVIRONMENT_VARIABLE: &str = "SHIDA_AGENT_PATH";

pub struct EnvironmentConfigurationFactory;

impl EnvironmentConfigurationFactory {
    pub fn new() -> Self {
        Self
    }
}

impl ConfigurationFactory for EnvironmentConfigurationFactory {
    fn make(&self) -> ShidaConfiguration {
        // agent_path: env::var(AGENT_PATH_ENVIRONMENT_VARIABLE)
        //     .map(PathBuf::from)
        //     .ok(),

        ShidaConfiguration::new(
            DataDirectoryConfiguration::new(
                env::var(SHIDA_DATA_DIRECTORY_ENVIRONMENT_VARIABLE)
                    .map(PathBuf::from)
                    .ok(),
            ),
            ReplConfiguration::new(
                env::var(SHIDA_REPL_ENVIRONMENT_VARIABLE)
                    .map(PathBuf::from)
                    .ok(),
            ),
        )
    }
}
