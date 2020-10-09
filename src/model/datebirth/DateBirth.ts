export class DateBirth {
  constructor(
    private id: string,
    private user_id: string,
    private datebirth: string,
    private updatedat: string
  ) {}

  getId = (): string => this.id;

  getUser_Id = (): string => this.user_id;

  getDateBirth = (): string => this.datebirth;

  getUpdatedAt = (): string => this.updatedat;
}
