use super::ShidaConfiguration;

pub trait ShidaConfigurationFactory {
    fn make(&self) -> ShidaConfiguration;
}
