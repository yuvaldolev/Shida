use std::{
    fs,
    path::{Path, PathBuf},
};

#[derive(Clone)]
pub struct Directory {
    path: PathBuf,
}

impl Directory {
    pub fn new(path: PathBuf) -> shida_error::Result<Self> {
        Self::create_directory(&path)?;

        Ok(Self { path })
    }

    pub fn get_path(&self) -> &Path {
        &self.path
    }

    pub fn get_sub_path(&self, sub_path: &Path) -> PathBuf {
        let mut path = self.path.clone();
        path.push(sub_path);

        path
    }

    fn create_directory(path: &Path) -> shida_error::Result<()> {
        if !path.exists() {
            return fs::create_dir_all(path)
                .map_err(|e| shida_error::Error::CreateDirectory(e, path.display().to_string()));
        }

        if !path.is_dir() {
            return Err(shida_error::Error::PathExistsButIsNotADirectory(
                path.display().to_string(),
            ));
        }

        Ok(())
    }
}
