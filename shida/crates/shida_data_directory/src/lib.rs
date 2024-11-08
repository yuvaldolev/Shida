use std::{
    env, fs,
    path::{Path, PathBuf},
};

#[derive(Clone)]
pub struct DataDirectory {
    path: PathBuf,
}

const DATA_DIRECTORY_ENVIRONMENT_VARIABLE: &str = "SHIDA_DATA_DIRECTORY";
const DEFAULT_DATA_SUB_DIRECTORY: &str = "shida";

impl DataDirectory {
    pub fn new() -> shida_error::Result<Self> {
        let path = env::var(DATA_DIRECTORY_ENVIRONMENT_VARIABLE)
            .map(PathBuf::from)
            .or_else(|_| Self::compute_default_path())?;

        Self::create_directory(&path)?;

        Ok(Self { path })
    }

    pub fn get_sub_path() {}

    fn compute_default_path() -> shida_error::Result<PathBuf> {
        let mut path = PathBuf::new();
        path.push(dirs::data_dir().ok_or_else(|| shida_error::Error::NoUserDataDirectory)?);
        path.push(DEFAULT_DATA_SUB_DIRECTORY);

        Ok(path)
    }

    fn create_directory(path: &Path) -> shida_error::Result<()> {
        if !path.exists() {
            fs::create_dir_all(path).map_err(|e| {
                shida_error::Error::CreateDataDirectory(e, path.display().to_string())
            })?;

            return Ok(());
        }

        if !path.is_dir() {
            return Err(shida_error::Error::DataDirectoryPathNotADirectory(
                path.display().to_string(),
            ));
        }

        Ok(())
    }
}
