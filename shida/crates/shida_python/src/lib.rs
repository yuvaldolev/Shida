use std::{
    path::{Path, PathBuf},
    process::Command,
};

pub struct Python {
    path: PathBuf,
}

impl Python {
    pub fn new() -> shida_error::Result<Self> {
        let path = which::which("python3").map_err(shida_error::Error::LocatePython)?;

        Ok(Self { path })
    }

    pub fn get_path(&self) -> &Path {
        &self.path
    }

    pub fn make_command(&self) -> Command {
        Command::new(&self.path)
    }
}
