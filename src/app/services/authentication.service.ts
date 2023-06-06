
import { HttpClient, HttpHeaders, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Platform, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

export interface LoginResponse {
  success: boolean;
  user: {
      id: number,
      cf: string,
      username: string,
      name: string,
      surname: string,
      email: string,
      roles: string[],
  };
  token: string;
}
@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);
  token = '';
  uuidv4: string;
  // headers = {Connection : 'Keep-Alive'};
  constructor(
    private storage: Storage,
    private plt: Platform,
    private http: HttpClient,
    ) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get(environment.TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    });
  }

  login(user: string, pw: string, uuidv4: string, that) {

    this.http.post<LoginResponse>(
      environment.API_URL + 'user/login',
      { username: user, password: pw, uuid: uuidv4 }).subscribe(
        value => {
          this.token = value.token;
          this.storage.set(environment.TOKEN_KEY, 'Bearer ' + this.token).then(() => {
            this.authenticationState.next(true);
            that.success();
            console.log(value);
          });
          this.storage.set(environment.USER_DATA, value.user).then();
        },
        error => {
          console.log(error);
          if (error.status === 404) {
            that.invalidUsername();
          }
          else if (error.status === 401) {
            that.loginFail();
          }
          else if (error.status === 0) {
            that.connectionFailed();
          }
        }
      );
  }

  logout(uuid: string) {
    this.http.get(
      environment.API_URL + 'user/logout?uuid=' + uuid,
      { headers: {}},
    );

    return this.storage.remove(environment.TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}
