use std::path::{Path, PathBuf};

pub struct ReplConfiguration {
    path: Option<PathBuf>,
    download_url: String,
}

impl ReplConfiguration {
    pub fn new(path: Option<PathBuf>, download_url: String) -> Self {
        Self { path, download_url }
    }

    pub fn get_path(&self) -> Option<&Path> {
        self.path.as_deref()
    }

    pub fn get_download_url(&self) -> &str {
        &self.download_url
    }
}
