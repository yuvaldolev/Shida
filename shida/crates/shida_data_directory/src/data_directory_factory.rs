use std::path::PathBuf;

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
            .map(PathBuf::from)
            .ok_or(())
            .or_else(|_| Self::compute_default_path())?;

        Directory::new(path)
    }

    fn compute_default_path() -> shida_error::Result<PathBuf> {
        let mut path = PathBuf::new();
        path.push(dirs::data_dir().ok_or_else(|| shida_error::Error::NoUserDataDirectory)?);
        path.push(DEFAULT_DATA_SUB_DIRECTORY);

        Ok(path)
    }
}
