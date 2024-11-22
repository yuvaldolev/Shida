use std::{
    fs::File,
    io,
    path::{Path, PathBuf},
};

use shida_file_system::Directory;
use shida_python::Python;

pub struct Virtualenv {
    python: Python,
    zipapp_path: PathBuf,
}

const VIRTUALENV_DIRECTORY_SUB_PATH: &str = "virtualenv";
const VIRTUALENV_ZIPAPP_SUB_PATH: &str = "virtualenv.pyz";
const VIRTUALENV_ZIPAPP_DOWNLOAD_URL: &str = "https://bootstrap.pypa.io/virtualenv.pyz";

impl Virtualenv {
    pub fn new(data_directory: &Directory) -> shida_error::Result<Self> {
        let python = Python::new()?;

        let directory = Directory::new(data_directory.get_sub_path(VIRTUALENV_DIRECTORY_SUB_PATH))?;

        let zipapp_path = directory.get_sub_path(VIRTUALENV_ZIPAPP_SUB_PATH);

        Self::initialize_zipapp(&zipapp_path)?;

        tracing::info!(
            "Initialized virtualenv with zipapp at path '{}'",
            zipapp_path.display()
        );

        Ok(Self {
            python,
            zipapp_path,
        })
    }

    pub fn create_virtual_environment(&self, path: &Path) -> shida_error::Result<()> {
        tracing::debug!(
            "Creating a new virtual environment at path '{}'",
            path.display()
        );

        let output = self
            .python
            .make_command()
            .arg(&self.zipapp_path)
            .arg(path)
            .output()
            .map_err(|e| {
                shida_error::Error::ExecuteVirtualenv(
                    e,
                    self.python.get_path().display().to_string(),
                    self.zipapp_path.display().to_string(),
                    path.display().to_string(),
                )
            })?;

        if !output.status.success() {
            return Err(shida_error::Error::CreatePythonVirtualEnvironment(
                path.display().to_string(),
                String::from_utf8_lossy(&output.stdout).into_owned(),
                String::from_utf8_lossy(&output.stderr).into_owned(),
            ));
        }

        Ok(())
    }

    fn initialize_zipapp(path: &Path) -> shida_error::Result<()> {
        if !path.exists() {
            return Self::download_zipapp(path);
        }

        if !path.is_file() {
            return Err(shida_error::Error::VirtualenvZipappPathExistsButIsNotAFile(
                path.display().to_string(),
            ));
        }

        Ok(())
    }

    fn download_zipapp(path: &Path) -> shida_error::Result<()> {
        tracing::debug!("Downloading virtualenv to path '{}'", path.display());

        let mut zipapp_file = File::options()
            .write(true)
            .create_new(true)
            .open(path)
            .map_err(|e| {
                shida_error::Error::CreateVirtualenvZipappFile(e, path.display().to_string())
            })?;

        let mut response = reqwest::blocking::get(VIRTUALENV_ZIPAPP_DOWNLOAD_URL).map_err(|e| {
            shida_error::Error::DownloadVirtualenvZipapp(
                e,
                VIRTUALENV_ZIPAPP_DOWNLOAD_URL.to_owned(),
            )
        })?;

        io::copy(&mut response, &mut zipapp_file).map_err(|e| {
            shida_error::Error::WriteVirtualenvZipappToFile(e, path.display().to_string())
        })?;

        Ok(())
    }
}
