from frida_tools.repl import REPLApplication


class ShidaRepl(REPLApplication):
    def __init__(self) -> None:
        super().__init__()

    def _print_startup_message(self) -> None:
        self._print(
            r"""     _____
    / ____|  Shida - Interactive Frida Shell for Researchers
   | (___
    \___ \   Commands:
    ____) |      help      -> Displays the help system
   |_____/       object?   -> Display information about 'object'
   . . . .       exit/quit -> Exit
   . . . .
   . . . .   More info at https://frida.re/docs/home/"""
        )

    def _print_help(self, expression: str) -> None:
        try:
            if expression.startswith("shida"):
                self._print(
                    self._script.exports_sync.shida_retrieve_documentation(
                        expression[:-1]
                    ),
                )
            else:
                super()._print_help(expression)
        except:
            self._print(f"Failed retrieving documentation")
