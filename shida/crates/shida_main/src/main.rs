use shida::Shida;
use shida_configuration_factory::{ConfigurationFactory, EnvironmentConfigurationFactory};

fn main() -> anyhow::Result<()> {
    // TODO: Add logging - show errors only by default.

    dotenv::dotenv().ok();

    let configuration_factory = EnvironmentConfigurationFactory::new();
    let configuration = configuration_factory.make();

    let shida = Shida::new(&configuration)?;
    shida.run();

    Ok(())
}
