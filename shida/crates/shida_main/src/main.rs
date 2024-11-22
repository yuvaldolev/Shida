use shida::Shida;
use shida_configuration_factory::{ConfigurationFactory, EnvironmentConfigurationFactory};
use tracing_subscriber::{fmt::format::FmtSpan, EnvFilter};

fn main() -> anyhow::Result<()> {
    dotenv::dotenv().ok();

    tracing_subscriber::fmt()
        .with_env_filter(EnvFilter::from_default_env())
        .with_span_events(FmtSpan::FULL)
        .init();

    let configuration_factory = EnvironmentConfigurationFactory::new();
    let configuration = configuration_factory.make();

    let shida = Shida::new(&configuration)?;
    shida.run();

    Ok(())
}
