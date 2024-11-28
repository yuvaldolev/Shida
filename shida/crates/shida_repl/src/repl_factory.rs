use std::path::{Path, PathBuf};

use shida_file_system::Directory;
use shida_python_virtual_environment::PythonVirtualEnvironment;

use crate::{Repl, ReplConfiguration};

pub struct ReplFactory {
    data_directory: Directory,
}

impl ReplFactory {
    pub fn new(data_directory: Directory) -> Self {
        Self { data_directory }
    }

    pub fn make(&self, configuration: &ReplConfiguration) -> shida_error::Result<Repl> {
        let path = configuration
            .get_path()
            .map(Path::to_path_buf)
            .ok_or(())
            .or_else(|_| self.retrieve_virtualized_repl_path(configuration.get_download_url()))?;

        Ok(Repl::new(path))
    }

    fn retrieve_virtualized_repl_path(&self, download_url: &str) -> shida_error::Result<PathBuf> {
        let python_virtual_environemnt = PythonVirtualEnvironment::new(&self.data_directory)?;

        Ok(PathBuf::new())
    }
}
