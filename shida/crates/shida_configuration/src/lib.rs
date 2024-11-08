mod environment_configuration;

pub use environment_configuration::EnvironmentConfiguration;

pub trait Configuration {
    fn get_repl_path(&self) -> Option<&str>;

    fn get_agent_path(&self) -> Option<&str>;
}
