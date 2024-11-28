use std::path::{Path, PathBuf};

use shida_file_system::Directory;
use shida_python_virtual_environment::PythonVirtualEnvironment;

use crate::{Repl, ReplConfiguration};

// TODO: Update when Shida REPL is uploaded to PyPI.
const REPL_PIP_PACKAGE: &str = "frida-tools";
const REPL_BINARY_NAME: &str = "frida";

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
            .or_else(|_| self.retrieve_virtualized_repl_path())?;

        Ok(Repl::new(path))
    }

    fn retrieve_virtualized_repl_path(&self) -> shida_error::Result<PathBuf> {
        let python_virtual_environment = PythonVirtualEnvironment::new(&self.data_directory)?;
        python_virtual_environment.install(REPL_PIP_PACKAGE)?;

        let repl_path = python_virtual_environment.get_binary_path(REPL_BINARY_NAME)?;
        tracing::info!("Retrieved virtualized REPL path '{}'", repl_path.display());

        Ok(repl_path)
    }
}
