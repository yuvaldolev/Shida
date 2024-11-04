use shida_python_virtual_environment::PythonVirtualEnvironment;

pub struct Shida {
    python_virtual_environment: PythonVirtualEnvironment,
}

impl Shida {
    pub fn new(python_virtual_environment: PythonVirtualEnvironment) -> Self {
        Self {
            python_virtual_environment,
        }
    }
}
