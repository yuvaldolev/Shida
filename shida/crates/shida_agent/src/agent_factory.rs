use std::path::PathBuf;

use shida_file_system::Directory;

use crate::{Agent, AgentConfiguration};

pub struct AgentFactory {
    data_directory: Directory,
}

impl AgentFactory {
    pub fn new(data_directory: Directory) -> Self {
        Self { data_directory }
    }

    pub fn make(&self, configuration: AgentConfiguration) -> shida_error::Result<Agent> {
        Ok(Agent::new(PathBuf::new()))
    }
}
