use shida::Shida;
use shida_configuration_factory::{ConfigurationFactory, EnvironmentConfigurationFactory};

fn main() -> anyhow::Result<()> {
    dotenv::dotenv().ok();

    // TODO: Split configuration factories into their own crate (separate from
    // the `ShidaConfiguration` struct which should stay in the `shida` crate).
    let configuration_factory = EnvironmentConfigurationFactory::new();
    let configuration = configuration_factory.make();

    let shida = Shida::new(&configuration)?;
    shida.run();

    Ok(())
}
