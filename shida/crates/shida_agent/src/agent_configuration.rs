use std::path::{Path, PathBuf};

pub struct AgentConfiguration {
    path: Option<PathBuf>,
}

impl AgentConfiguration {
    pub fn new(path: Option<PathBuf>) -> Self {
        Self { path }
    }

    pub fn get_path(&self) -> Option<&Path> {
        self.path.as_deref()
    }
}
