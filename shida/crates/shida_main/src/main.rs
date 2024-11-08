use shida::Shida;
use shida_configuration::EnvironmentConfiguration;

fn main() -> anyhow::Result<()> {
    dotenv::dotenv().ok();

    let configuration = EnvironmentConfiguration::new();

    let shida = Shida::new(&configuration);
    shida.run();

    Ok(())
}
