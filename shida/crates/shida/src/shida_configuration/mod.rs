mod environment_shida_configuration_factory;
mod shida_configuration_factory;

pub use environment_shida_configuration_factory::EnvironmentShidaConfigurationFactory;
pub use shida_configuration_factory::ShidaConfigurationFactory;

use shida_repl::ReplConfiguration;

pub struct ShidaConfiguration {
    repl_configuration: ReplConfiguration,
}

impl ShidaConfiguration {
    pub fn new(repl_configuration: ReplConfiguration) -> Self {
        Self { repl_configuration }
    }

    pub fn get_repl_configuration(&self) -> &ReplConfiguration {
        &self.repl_configuration
    }
}
