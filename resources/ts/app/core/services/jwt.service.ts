export default class JWTService {
  getToken(): string {
    return window.localStorage.getItem('userToken');
  }

  saveToken(token: string) {
    window.localStorage.setItem('userToken', token);
  }

  destroyToken() {
    window.localStorage.removeItem('userToken');
  }
}
