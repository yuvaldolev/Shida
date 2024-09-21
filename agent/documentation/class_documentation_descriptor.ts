export class ClassDocumentationDescriptor {
  private readonly name: string;
  private readonly description: string;

  constructor(name: string, description: string) {
    this.name = `${name} CLI`;
    this.description = description;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }
}
