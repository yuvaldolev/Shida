mod shida_configuration;

pub use shida_configuration::ShidaConfiguration;

use shida_data_directory::DataDirectoryFactory;
use shida_repl::{Repl, ReplFactory};

pub struct Shida {
    repl: Repl,
}

impl Shida {
    pub fn new(configuration: &ShidaConfiguration) -> shida_error::Result<Self> {
        let data_directory_factory = DataDirectoryFactory::new();
        let data_directory =
            data_directory_factory.make(configuration.get_data_directory_configuration())?;

        let repl_factory = ReplFactory::new(data_directory);
        let repl = repl_factory.make(configuration.get_repl_configuration())?;

        Ok(Self { repl })
    }

    pub fn run(&self) {}
}
