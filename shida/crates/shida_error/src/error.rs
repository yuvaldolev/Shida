use std::io;

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error("cloudn't find the user's data directory")]
    NoUserDataDirectory,

    #[error("failed creating data directory at path '{1}'")]
    CreateDataDirectory(#[source] io::Error, String),

    #[error("path '{0}' already exists but is not a directory")]
    DataDirectoryPathNotADirectory(String),
}
