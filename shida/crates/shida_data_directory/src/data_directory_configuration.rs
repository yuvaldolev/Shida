use std::path::{Path, PathBuf};

pub struct DataDirectoryConfiguration {
    path: Option<PathBuf>,
}

impl DataDirectoryConfiguration {
    pub fn new(path: Option<PathBuf>) -> Self {
        Self { path }
    }

    pub fn get_path(&self) -> Option<&Path> {
        self.path.as_deref()
    }
}

impl Default for DataDirectoryConfiguration {
    fn default() -> Self {
        todo!()
    }
}
