use super::{ConfigurationFactory, ShidaConfiguration};

pub struct FigmentConfigurationFactory;

impl FigmentConfigurationFactory {
    pub fn new() -> Self {
        Self
    }
}

impl ConfigurationFactory for FigmentConfigurationFactory {
    fn make(&self) -> ShidaConfiguration {
        ShidaConfiguration::default()
    }
}
