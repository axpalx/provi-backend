export class Address {
  constructor(
    private id: string,
    private user_id: string,
    private cep: string,
    private street: string,
    private housenumber: number,
    private complement: string,
    private city: string,
    private state: string,
    private updatedat: string
  ) {}

  getId = (): string => this.id;

  getUser_Id = (): string => this.user_id;

  getCep = (): string => this.cep;

  getStreet = (): string => this.street;

  getHouseNumber = (): number => this.housenumber;

  getComplement = (): string => this.complement;

  getCity = (): string => this.city;

  getState = (): string => this.state;

  getUpdatedAt = (): string => this.updatedat;
}
