use std::{fs::File, io, path::Path};

use shida_file_system::Directory;

pub struct PythonVirtualEnvironment;

const VIRTUALENV_DIRECTORY_SUB_PATH: &str = "virtualenv";
const VIRTUALENV_ZIPAPP_SUB_PATH: &str = "virtualenv.pyz";
const VIRTUALENV_ZIPAPP_DOWNLOAD_URL: &str = "https://bootstrap.pypa.io/virtualenv.pyz";

impl PythonVirtualEnvironment {
    pub fn new(data_directory: &Directory) -> shida_error::Result<Self> {
        let directory_sub_path = Path::new(VIRTUALENV_DIRECTORY_SUB_PATH);
        let directory = Directory::new(data_directory.get_sub_path(&directory_sub_path))?;

        let zipapp_sub_path = Path::new(VIRTUALENV_ZIPAPP_SUB_PATH);
        let zipapp_path = directory.get_sub_path(&zipapp_sub_path);
        Self::initialize_virtualenv(&zipapp_path)?;

        Ok(Self)
    }

    fn initialize_virtualenv(zipapp_path: &Path) -> shida_error::Result<()> {
        if !zipapp_path.exists() {
            return Self::download_virtualenv(zipapp_path);
        }

        if !zipapp_path.is_file() {
            return Err(shida_error::Error::VirtualenvZipappPathExistsButIsNotAFile(
                zipapp_path.display().to_string(),
            ));
        }

        Ok(())
    }

    fn download_virtualenv(zipapp_path: &Path) -> shida_error::Result<()> {
        let mut zipapp_file = File::options()
            .write(true)
            .create_new(true)
            .open(zipapp_path)
            .map_err(|e| {
                shida_error::Error::CreateVirtualenvZipappFile(e, zipapp_path.display().to_string())
            })?;

        let mut response = reqwest::blocking::get(VIRTUALENV_ZIPAPP_DOWNLOAD_URL).map_err(|e| {
            shida_error::Error::DownloadVirtualenvZipapp(
                e,
                VIRTUALENV_ZIPAPP_DOWNLOAD_URL.to_owned(),
            )
        })?;

        io::copy(&mut response, &mut zipapp_file).map_err(|e| {
            shida_error::Error::WriteVirtualenvZipappToFile(e, zipapp_path.display().to_string())
        })?;

        Ok(())
    }
}
