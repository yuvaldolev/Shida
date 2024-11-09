use std::io;

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error("cloudn't find the user's data directory")]
    NoUserDataDirectory,

    #[error("failed creating directory at path '{1}'")]
    CreateDirectory(#[source] io::Error, String),

    #[error("path '{0}' already exists but is not a directory")]
    PathExistsButIsNotADirectory(String),

    #[error("virtualenv zipapp path '{0}' exists but is not a file")]
    VirtualenvZipappPathExistsButIsNotAFile(String),

    #[error("failed creating virtualenv zipapp file at path '{1}'")]
    CreateVirtualenvZipappFile(#[source] io::Error, String),

    #[error("failed downloading virtualenv zipapp from URL '{1}'")]
    DownloadVirtualenvZipapp(#[source] reqwest::Error, String),

    #[error("failed writing virtualenv zipapp to file at path '{1}'")]
    WriteVirtualenvZipappToFile(#[source] io::Error, String),
}
