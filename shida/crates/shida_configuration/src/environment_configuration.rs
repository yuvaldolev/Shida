use std::env;

use crate::Configuration;

const REPL_PATH_ENVIRONMENT_VARIABLE: &str = "SHIDA_REPL_PATH";
const AGENT_PATH_ENVIRONMENT_VARIABLE: &str = "SHIDA_AGENT_PATH";

pub struct EnvironmentConfiguration {
    repl_path: Option<String>,
    agent_path: Option<String>,
}

impl EnvironmentConfiguration {
    pub fn new() -> Self {
        Self {
            repl_path: env::var(REPL_PATH_ENVIRONMENT_VARIABLE).ok(),
            agent_path: env::var(AGENT_PATH_ENVIRONMENT_VARIABLE).ok(),
        }
    }
}

impl Configuration for EnvironmentConfiguration {
    fn get_repl_path(&self) -> Option<&str> {
        self.repl_path.as_deref()
    }

    fn get_agent_path(&self) -> Option<&str> {
        self.agent_path.as_deref()
    }
}
