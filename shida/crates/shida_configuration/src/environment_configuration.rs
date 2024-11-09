use std::{
    env,
    path::{Path, PathBuf},
};

use crate::Configuration;

const REPL_PATH_ENVIRONMENT_VARIABLE: &str = "SHIDA_REPL_PATH";
const AGENT_PATH_ENVIRONMENT_VARIABLE: &str = "SHIDA_AGENT_PATH";

pub struct EnvironmentConfiguration {
    repl_path: Option<PathBuf>,
    agent_path: Option<PathBuf>,
}

impl EnvironmentConfiguration {
    pub fn new() -> Self {
        Self {
            repl_path: env::var(REPL_PATH_ENVIRONMENT_VARIABLE)
                .map(PathBuf::from)
                .ok(),
            agent_path: env::var(AGENT_PATH_ENVIRONMENT_VARIABLE)
                .map(PathBuf::from)
                .ok(),
        }
    }
}

impl Configuration for EnvironmentConfiguration {
    fn get_repl_path(&self) -> Option<&Path> {
        self.repl_path.as_deref()
    }

    fn get_agent_path(&self) -> Option<&Path> {
        self.agent_path.as_deref()
    }
}
