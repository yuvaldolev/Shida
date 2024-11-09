use shida_configuration::Configuration;
use shida_repl::{Repl, ReplFactory};

pub struct Shida {
    repl: Repl,
}

impl Shida {
    pub fn new(configuration: &impl Configuration) -> Self {
        // let data_directory = DataDirectory::new(configuration.get_data_directory_path());
        let repl_factory = ReplFactory::new();

        Self {
            repl: repl_factory.make(configuration.get_repl_path()),
        }
    }

    pub fn run(&self) {}
}
