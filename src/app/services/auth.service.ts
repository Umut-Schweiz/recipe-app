import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError, tap, BehaviorSubject} from 'rxjs';
import { AuthResponseData } from '../shared/auth-response.model';
import { environment } from '../../environments/environment'

import { User } from '../shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  initializeSubjet:any = null;
  user = new BehaviorSubject<User>(this.initializeSubjet);
  private tokenExpirationTimer:any;


  constructor(
    private http: HttpClient,
    private router: Router) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
      })
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
      })
    );
  }

  autoLogin() {
    try {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate:string;
      } = JSON.parse(localStorage.getItem('userData') || 'default');

      if(!userData){
        return;
      }
      const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

      if(loadedUser.token){ // please look at the userData model ==> getoken()
        this.user.next(loadedUser);
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
        this.autoLogout(expirationDuration);
      }
    } catch (error:any) {
      console.log('Error: ', error.message);
    }
  }

  logout(){
    let logout:any = null;
    this.user.next(logout);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration:number){
    this.tokenExpirationTimer = setTimeout( () => {
      this.logout();
    } , expirationDuration);
  }


  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number){
    const expirationDate = new Date(
      new Date().getTime() + expiresIn * 1000
    );
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';

    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(() => errorMessage);
    }

    switch (errorResponse.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is invalid or the user does not have a password.';
        break;
      case 'USER_DISABLED':
        errorMessage = 'The user account has been disabled by an administrator.';
        break;
      case 'EMAIL_EXISTS':
        errorMessage = 'The email address is already in use by another account.';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled for this project.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
    }

    return throwError(() => errorMessage);

  }


}
