export class LogFilter {
  private readonly messageRegex: RegExp;
  private readonly tagRegex?: RegExp;
  private readonly minimumPriority?: number;
  private readonly maximumPriority?: number;

  constructor(
      messageRegex: RegExp,
      tagRegex?: RegExp,
      minimumPriority?: number,
      maximumPriority?: number,
  ) {
    this.messageRegex = messageRegex;
    this.tagRegex = tagRegex;
    this.minimumPriority = minimumPriority;
    this.maximumPriority = maximumPriority;
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
