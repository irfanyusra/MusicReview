export class User {
  constructor(
    public id: string,
    public email: string,
    public name: string,
    public password: string,
    public isAdmin: boolean,
    public verified: boolean,
    public isActive: boolean
  ) {}
}
