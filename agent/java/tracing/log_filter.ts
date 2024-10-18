export class LogFilter {
  private readonly onMatch: (trace: string) => void;
  private readonly messageRegex: string;
  private readonly minimumLogLevel?: number;
  private readonly maximumLogLevel?: number;
  private readonly tagRegex?: string;

  constructor(
      onMatch: (trace: string) => void,
      messageRegex: string,
      minimumLogLevel?: number,
      maximumLogLevel?: number,
      tagRegex?: string,
  ) {
    this.onMatch = onMatch;
    this.messageRegex = messageRegex;
    this.minimumLogLevel = minimumLogLevel;
    this.maximumLogLevel = maximumLogLevel;
    this.tagRegex = tagRegex;
  }
}
