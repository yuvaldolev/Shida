mod virtualenv;

use std::path::Path;

use shida_file_system::Directory;
use virtualenv::Virtualenv;

pub struct PythonVirtualEnvironment;

const VIRTUAL_ENVIRONMENT_SUB_PATH: &str = "venv";

impl PythonVirtualEnvironment {
    pub fn new(data_directory: &Directory) -> shida_error::Result<Self> {
        let path = data_directory.get_sub_path(VIRTUAL_ENVIRONMENT_SUB_PATH);
        Self::create_virtual_environment(&path, data_directory)?;

        Ok(Self)
    }

    fn create_virtual_environment(
        path: &Path,
        data_directory: &Directory,
    ) -> shida_error::Result<()> {
        if !path.exists() {
            let virtualenv = Virtualenv::new(data_directory)?;
            return virtualenv.create_virtual_environment(path);
        }

        if !path.is_dir() {
            return Err(
                shida_error::Error::PythonVirtualEnvironmentPathExistsButIsNotADirectory(
                    path.display().to_string(),
                ),
            );
        }

        return Ok(());
    }
}
