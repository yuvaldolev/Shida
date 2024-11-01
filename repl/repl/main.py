from .shida_repl import ShidaRepl


def main():
    try:
        shida_repl = ShidaRepl()
        shida_repl.run()
    except KeyboardInterrupt:
        pass
