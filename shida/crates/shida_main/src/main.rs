use shida::{EnvironmentShidaConfigurationFactory, Shida, ShidaConfigurationFactory};

fn main() -> anyhow::Result<()> {
    dotenv::dotenv().ok();

    let configuration_factory = EnvironmentShidaConfigurationFactory::new();
    let configuration = configuration_factory.make();

    let shida = Shida::new(&configuration);
    shida.run();

    Ok(())
}
