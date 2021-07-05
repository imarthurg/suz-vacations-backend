export class AuthContextService {
  private user: any;

  public setUser(user: any) {
    this.user = user;
  }

  public getUser(): any {
    return this.user;
  }
}
