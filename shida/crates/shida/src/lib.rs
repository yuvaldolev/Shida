mod configuration;

use configuration::ConfigurationFactory;
use shida_agent::{Agent, AgentFactory};
use shida_data_directory::DataDirectoryFactory;
use shida_repl::{Repl, ReplFactory};

pub struct Shida {
    repl: Repl,
    agent: Agent,
}

impl Shida {
    pub fn new(configuration_factory: &impl ConfigurationFactory) -> shida_error::Result<Self> {
        let configuration = configuration_factory.make();

        let data_directory_factory = DataDirectoryFactory::new();
        let data_directory =
            data_directory_factory.make(configuration.get_data_directory_configuration())?;

        let repl_factory = ReplFactory::new(data_directory);
        let repl = repl_factory.make(configuration.get_repl_configuration())?;

        let agent_factory = AgentFactory::new(data_directory);
        let agent = agent_factory.make(configuration.get_agent_configuration())?;

        Ok(Self { repl, agent })
    }

    pub fn run(&self) {
        // TODO: repl.run(agent);
    }
}
