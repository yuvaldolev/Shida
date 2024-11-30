use super::ShidaConfiguration;

pub trait ConfigurationFactory {
    fn make(&self) -> ShidaConfiguration;
}
