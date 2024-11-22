use std::path::{Path, PathBuf};

use shida_file_system::Directory;

use crate::DataDirectoryConfiguration;

pub struct DataDirectoryFactory;

const DEFAULT_DATA_SUB_DIRECTORY: &str = "shida";

impl DataDirectoryFactory {
    pub fn new() -> Self {
        Self
    }

    pub fn make(
        &self,
        configuration: &DataDirectoryConfiguration,
    ) -> shida_error::Result<Directory> {
        let path = configuration
            .get_path()
            .map(Path::to_path_buf)
            .ok_or(())
            .or_else(|_| Self::compute_default_path())?;

        let directory = Directory::new(path.clone())?;

        tracing::info!("Initialized data directory at path: '{}'", path.display());

        Ok(directory)
    }

    fn compute_default_path() -> shida_error::Result<PathBuf> {
        tracing::debug!("Computing default data directory path");
        let mut path = PathBuf::new();
        path.push(dirs::data_dir().ok_or_else(|| shida_error::Error::NoUserDataDirectory)?);
        path.push(DEFAULT_DATA_SUB_DIRECTORY);

        Ok(path)
    }
}
