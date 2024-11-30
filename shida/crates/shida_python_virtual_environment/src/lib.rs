mod virtualenv;

use std::{
    path::{Path, PathBuf},
    process::Command,
};

use shida_file_system::Directory;
use virtualenv::Virtualenv;

pub struct PythonVirtualEnvironment {
    directory: Directory,
}

const SHIDA_DIRECTORY_VIRTUAL_ENVIRONMENT_SUB_PATH: &str = "venv";
const VIRTUAL_ENVIRONMENT_BINARY_DIRECTORY_SUB_PATH: &str = "bin";
const VIRTUAL_ENVIRONMENT_PIP_BINARY_SUB_PATH: &str = "pip";

impl PythonVirtualEnvironment {
    pub fn new(data_directory: &Directory) -> shida_error::Result<Self> {
        let path = data_directory.get_sub_path(SHIDA_DIRECTORY_VIRTUAL_ENVIRONMENT_SUB_PATH);
        Self::create_virtual_environment(&path, data_directory)?;

        tracing::info!(
            "Initialized Python virtual environment at path '{}'",
            path.display()
        );

        Ok(Self {
            directory: Directory::new(path)?,
        })
    }

    pub fn install(&self, package: &str) -> shida_error::Result<()> {
        let pip_binary = self.get_binary_path(VIRTUAL_ENVIRONMENT_PIP_BINARY_SUB_PATH)?;

        tracing::debug!(
            "Installing pip package '{}' using pip '{}'",
            package,
            pip_binary.display()
        );

        let output = Command::new(&pip_binary)
            .arg("install")
            .arg("-U")
            .args(["--retries", "1"])
            .arg(package)
            .output()
            .map_err(|e| {
                shida_error::Error::ExecutePipInstall(
                    e,
                    pip_binary.display().to_string(),
                    package.to_owned(),
                )
            })?;

        let stdout = String::from_utf8_lossy(&output.stdout);
        let stderr = String::from_utf8_lossy(&output.stderr);

        tracing::debug!(
            "pip install '{}' result: status='{}', stdout='{}', stderr='{}'",
            package,
            output.status,
            stdout,
            stderr
        );

        if !output.status.success() {
            return Err(shida_error::Error::InstallPipPackage(
                package.to_owned(),
                stdout.into_owned(),
                stderr.into_owned(),
            ));
        }

        Ok(())
    }

    pub fn get_binary_path(&self, name: impl AsRef<Path>) -> shida_error::Result<PathBuf> {
        let binary_directory = self
            .directory
            .get_sub_directory(VIRTUAL_ENVIRONMENT_BINARY_DIRECTORY_SUB_PATH)?;

        Ok(binary_directory.get_sub_path(name))
    }

    fn create_virtual_environment(
        path: &Path,
        data_directory: &Directory,
    ) -> shida_error::Result<()> {
        if !path.exists() {
            tracing::debug!(
                "Creating a new Python virtual environment at path '{}'",
                path.display()
            );

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

        Ok(())
    }
}
