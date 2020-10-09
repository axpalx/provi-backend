export class Cpf {
  constructor(
    private id: string,
    private user_id: string,
    private cpf: string,
    private updatedat: string
  ) {}

  getId = (): string => this.id;

  getUser_Id = (): string => this.user_id;

  getCpf = (): string => this.cpf;

  getUpdatedAt = (): string => this.updatedat;
}
