export class PhoneNumber {
  constructor(
    private id: string,
    private user_id: string,
    private phonenumber: number,
    private updatedat: string
  ) {}

  getId = (): string => this.id;

  getUser_Id = (): string => this.user_id;

  getPhoneNumber = (): number => this.phonenumber;

  getUpdatedAt = (): string => this.updatedat;
}
