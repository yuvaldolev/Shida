use shida_configuration::Configuration;
use shida_repl::Repl;

pub struct Shida {
    repl: Repl,
}

impl Shida {
    pub fn new(configuration: &impl Configuration) -> Self {
        Self {
            repl: Self::make_repl(configuration),
        }
    }

    pub fn run(&self) {}

    fn make_repl(cofiguration: &impl Configuration) -> Repl {
        //let python_virtual_environment = PythonVirtualEnvironment::new();
        Repl::new()
    }
}
