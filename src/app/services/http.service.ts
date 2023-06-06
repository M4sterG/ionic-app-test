import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode } from 'http-status-codes';

@Injectable({
  providedIn: 'root'
})

export class HttpService<T> {

  private path: string;

  constructor(
    public http: HttpClient,
    public storage: Storage,
  ) {
  }
  setPath(val: string) {
    this.path = val;
  }
  async post(param: HttpParams | null, endpoint?: string | null): Promise<Observable<T>> {
    if (endpoint !== null) {
      this.path += endpoint;
    }
    else {
      this.path += '/add';
    }
    const token = await this.storage.get(environment.TOKEN_KEY);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token
      }),
      params: param
    };
    return new Promise(resolve => {
      resolve(this.http.post<T>(
        environment.API_URL + this.path,
        httpOptions));
    });
  }

  async get(param: HttpParams | null, endpoint?: string | null): Promise<Observable<T>> {
    let fullPath = '';
    if (endpoint !== null && endpoint !== undefined) {
      fullPath = this.path += endpoint;
    }
    else {
      fullPath = this.path += '/get';
    }
    const token = await this.storage.get(environment.TOKEN_KEY);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token
      }),
      params: param
    };
    // console.log(this.path);
    return new Promise(resolve => {
      resolve(this.http.get<T>(
        environment.API_URL + fullPath,
        httpOptions));
    });
  }

  async put(param: HttpParams | null, endpoint?: string | null): Promise<Observable<T>> {
    if (endpoint !== null) {
      this.path += endpoint;
    }
    else {
      this.path += '/put';
    }
    const token = await this.storage.get(environment.TOKEN_KEY);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token
      }),
      params: param
    };
    return new Promise(resolve => {
      resolve(this.http.put<T>(
        environment.API_URL + this.path,
        httpOptions));
    });
  }

  async patch(param: HttpParams | null, endpoint?: string | null): Promise<Observable<T>> {
    if (endpoint !== null) {
      this.path += endpoint;
    }
    else {
      this.path += '/patch';
    }
    const token = await this.storage.get(environment.TOKEN_KEY);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token
      }),
      params: param
    };
    return new Promise(resolve => {
      resolve(this.http.patch<T>(
        environment.API_URL + this.path,
        httpOptions));
    });
  }

  handleError(error: HttpErrorResponse) {
    switch (error.status) {
      case StatusCodes.NOT_FOUND:
        break;
      case StatusCodes.INTERNAL_SERVER_ERROR:
        break;
      case StatusCodes.BAD_GATEWAY:
        break;
      case StatusCodes.FORBIDDEN:
        break;
      case StatusCodes.BAD_REQUEST:
        break;
      case StatusCodes.UNAUTHORIZED:
        break;
    }
  }
}
