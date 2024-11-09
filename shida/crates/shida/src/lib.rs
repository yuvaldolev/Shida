mod shida_configuration;

pub use shida_configuration::{
    EnvironmentShidaConfigurationFactory, ShidaConfiguration, ShidaConfigurationFactory,
};

use shida_repl::{Repl, ReplFactory};

pub struct Shida {
    repl: Repl,
}

impl Shida {
    pub fn new(configuration: &ShidaConfiguration) -> Self {
        // let data_directory = DataDirectory::new(configuration.get_data_directory_path());
        let repl_factory = ReplFactory::new();

        Self {
            repl: repl_factory.make(configuration.get_repl_configuration()),
        }
    }

    pub fn run(&self) {}
}
