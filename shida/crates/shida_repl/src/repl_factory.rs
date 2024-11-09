use std::path::{Path, PathBuf};

use shida_python_virtual_environment::PythonVirtualEnvironment;

use crate::{Repl, ReplConfiguration};

pub struct ReplFactory;

impl ReplFactory {
    pub fn new() -> Self {
        Self
    }

    pub fn make(&self, configuration: &ReplConfiguration) -> Repl {
        Repl::new(
            configuration
                .get_path()
                .map(Path::to_path_buf)
                .unwrap_or_else(|| self.retrieve_virtualized_repl_path()),
        )
    }

    fn retrieve_virtualized_repl_path(&self) -> PathBuf {
        // let python_virtual_environemnt = PythonVirtualEnvironment::new(data_directory);
        PathBuf::new()
    }
}
