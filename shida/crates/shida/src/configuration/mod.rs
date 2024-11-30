mod configuration_factory;
mod figment_configuration_factory;

pub use configuration_factory::ConfigurationFactory;
pub use figment_configuration_factory::FigmentConfigurationFactory;

use shida_data_directory::DataDirectoryConfiguration;
use shida_repl::ReplConfiguration;

#[derive(Default)]
pub struct ShidaConfiguration {
    data_directory_configuration: DataDirectoryConfiguration,
    repl_configuration: ReplConfiguration,
}

impl ShidaConfiguration {
    pub fn new(
        data_directory_configuration: DataDirectoryConfiguration,
        repl_configuration: ReplConfiguration,
    ) -> Self {
        Self {
            data_directory_configuration,
            repl_configuration,
        }
    }

    pub fn get_data_directory_configuration(&self) -> &DataDirectoryConfiguration {
        &self.data_directory_configuration
    }

    pub fn get_repl_configuration(&self) -> &ReplConfiguration {
        &self.repl_configuration
    }
}
