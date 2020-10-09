export class Name {
  constructor(
    private id: string,
    private user_id: string,
    private firstname: string,
    private lastname: string,
    private updatedat: string
  ) {}

  getId = (): string => this.id;

  getUser_Id = (): string => this.user_id;

  getFirstName = (): string => this.firstname;

  getLastName = (): string => this.lastname;

  getUpdatedAt = (): string => this.updatedat;
}
