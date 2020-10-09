export class User {
  constructor(
    private id: string,
    private email: string,
    private password: string
  ) {}

  public getId = (): string => this.id;

  public getEmail = (): string => this.email;

  public getPassword = (): string => this.password;
}
