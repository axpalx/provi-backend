export class OrderedQuantity {
  constructor(
    private id: string,
    private user_id: string,
    private orderedquantity: number,
    private updatedat: string
  ) {}

  getId = (): string => this.id;

  getUser_Id = (): string => this.user_id;

  getOrderedQuantity = (): number => this.orderedquantity;

  getUpdatedAt = (): string => this.updatedat;
}
