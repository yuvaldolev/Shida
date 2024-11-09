use std::{env, path::PathBuf};

use shida_repl::ReplConfiguration;

use super::{ShidaConfiguration, ShidaConfigurationFactory};

const REPL_PATH_ENVIRONMENT_VARIABLE: &str = "SHIDA_REPL_PATH";
// const AGENT_PATH_ENVIRONMENT_VARIABLE: &str = "SHIDA_AGENT_PATH";

pub struct EnvironmentShidaConfigurationFactory;

impl EnvironmentShidaConfigurationFactory {
    pub fn new() -> Self {
        Self
    }
}

impl ShidaConfigurationFactory for EnvironmentShidaConfigurationFactory {
    fn make(&self) -> ShidaConfiguration {
        // agent_path: env::var(AGENT_PATH_ENVIRONMENT_VARIABLE)
        //     .map(PathBuf::from)
        //     .ok(),

        ShidaConfiguration::new(ReplConfiguration::new(
            env::var(REPL_PATH_ENVIRONMENT_VARIABLE)
                .map(PathBuf::from)
                .ok(),
        ))
    }
}
