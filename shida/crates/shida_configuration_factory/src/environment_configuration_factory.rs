use std::{env, path::PathBuf};

use shida::ShidaConfiguration;
use shida_data_directory::DataDirectoryConfiguration;
use shida_repl::ReplConfiguration;

use crate::ConfigurationFactory;

const SHIDA_DATA_DIRECTORY_ENVIRONMENT_VARIABLE: &str = "SHIDA_DATA_DIRECTORY";

const SHIDA_REPL_ENVIRONMENT_VARIABLE: &str = "SHIDA_REPL";
const SHIDA_REPL_DOWNLOAD_URL_ENVIRONMENT_VARIABLE: &str = "SHIDA_REPL_DOWNLOAD_URL";

// TODO: Update when REPL wheel is uploaded to GitHub.
const DEFAULT_REPL_DOWNLOAD_URL: &str = "https://files.pythonhosted.org/packages/f0/4b/e06258438a2a4c74fd73878ade059ad3af79225d2b5fc25413392be28460/frida-tools-13.6.0.tar.gz";

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
                env::var(SHIDA_REPL_DOWNLOAD_URL_ENVIRONMENT_VARIABLE)
                    .unwrap_or_else(|_| String::from(DEFAULT_REPL_DOWNLOAD_URL)),
            ),
        )
    }
}
