import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FbAuthResponse, User} from '../../../shared/interfaces';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthService{
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('fb-token')
  }
  login(user: User): Observable<any> {
   return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
     .pipe(tap(this.setToken))
  }

  logout(){
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private setToken(response: FbAuthResponse | null) {
    if (response)
    {localStorage.setItem('fb-token', response.idToken)}
    else {localStorage.clear()}
  }
}
