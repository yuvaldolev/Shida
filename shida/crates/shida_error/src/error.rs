use std::io;

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error("cloudn't find the user's data directory")]
    NoUserDataDirectory,

    #[error("failed creating directory at path '{1}'")]
    CreateDirectory(#[source] io::Error, String),

    #[error("path '{0}' already exists but is not a directory")]
    PathExistsButIsNotADirectory(String),

    #[error("Python virtual environment path '{0}' already exists but is not a directory")]
    PythonVirtualEnvironmentPathExistsButIsNotADirectory(String),

    #[error("virtualenv zipapp path '{0}' already exists but is not a file")]
    VirtualenvZipappPathExistsButIsNotAFile(String),

    #[error("failed creating virtualenv zipapp file at path '{1}'")]
    CreateVirtualenvZipappFile(#[source] io::Error, String),

    #[error("failed downloading virtualenv zipapp from URL '{1}'")]
    DownloadVirtualenvZipapp(#[source] reqwest::Error, String),

    #[error("failed writing virtualenv zipapp to file at path '{1}'")]
    WriteVirtualenvZipappToFile(#[source] io::Error, String),

    #[error("failed locating Python exectuable")]
    LocatePython(#[source] which::Error),

    #[error("failed executing virtualenv from path '{2}' using Python '{1}' to create Python virtual environment at path '{3}'")]
    ExecuteVirtualenv(#[source] io::Error, String, String, String),

    #[error(
        "failed creating Python virtual environment at path '{0}': stdout='{1}', stderr='{2}'"
    )]
    CreatePythonVirtualEnvironment(String, String, String),
}
