
export class Advertising {

  constructor(
    public id: string,
    public title: string,
    public imageLink: string,
    public href: string,
    public dark: boolean = false
  ){}

  public getId(): string {
    return this.id;
  }
  public getTitle(): string {
    return this.title;
  }
  public getImage(): string {
    return this.imageLink;
  }
  public getHref(): string {
    return this.href;
  }
  public isDark(): boolean {
    return this.dark;
  }
}
