use std::path::{Path, PathBuf};

pub struct ReplConfiguration {
    path: Option<PathBuf>,
}

impl ReplConfiguration {
    pub fn new(path: Option<PathBuf>) -> Self {
        Self { path }
    }

    pub fn get_path(&self) -> Option<&Path> {
        self.path.as_deref()
    }
}
