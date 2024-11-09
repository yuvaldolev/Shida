mod environment_configuration_factory;

pub use environment_configuration_factory::EnvironmentConfigurationFactory;

use shida::ShidaConfiguration;

pub trait ConfigurationFactory {
    fn make(&self) -> ShidaConfiguration;
}
