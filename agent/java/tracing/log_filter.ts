export class LogFilter {
  private readonly messageRegex: RegExp;
  private readonly minimumPriority?: number;
  private readonly maximumPriority?: number;
  private readonly tagRegex?: RegExp;

  constructor(
      messageRegex: RegExp,
      minimumPriority?: number,
      maximumPriority?: number,
      tagRegex?: RegExp,
  ) {
    this.messageRegex = messageRegex;
    this.minimumPriority = minimumPriority;
    this.maximumPriority = maximumPriority;
    this.tagRegex = tagRegex;
  }

  matches(priority: number, tag: string, message: string): boolean {
    if ((typeof this.minimumPriority !== 'undefined') &&
        (priority < this.minimumPriority)) {
      return false;
    }

    if ((typeof this.maximumPriority !== 'undefined') &&
        (priority > this.maximumPriority)) {
      return false;
    }

    if ((typeof this.tagRegex !== 'undefined') &&
        (null == tag.match(this.tagRegex))) {
      return false;
    }

    return (null != message.match(this.messageRegex));
  }
}
