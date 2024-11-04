use shida::Shida;
use shida_python_virtual_environment::PythonVirtualEnvironment;

fn main() {
    let python_virtual_environment = PythonVirtualEnvironment::new();
    let shida = Shida::new(python_virtual_environment);
    shida.run();
}
