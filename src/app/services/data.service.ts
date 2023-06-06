import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface Response {
  success: boolean;
  results: any;
  total: number;
}
@Injectable()
export class DataService<T> {

  dataChange: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  path: string;
  token: string;

  constructor(
    public httpClient: HttpClient,
    public storage: Storage,
  ) {
  }

  public setPath(relativePath) {
    this.path = relativePath;
  }
  get data(): T[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  fetchData(httpOptions) {
    return this.httpClient.get<Response>(environment.API_URL + this.path + '/get', httpOptions);
  }

  addItem(item: T): void {
    this.storage.get(environment.TOKEN_KEY).then(token => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: token
        })
      };
      this.httpClient.post(environment.API_URL + this.path + '/add', item, httpOptions).subscribe(data => {
        this.dialogData = item;
        // this.toasterService.showToaster('Successfully added', 3000);
      },
        (err: HttpErrorResponse) => {
          // this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
        });
    });
  }

  // UPDATE, PUT METHOD
  updateItem(item: T): void {
    this.storage.get(environment.TOKEN_KEY).then(token => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: token
        })
      };
      this.httpClient.patch(environment.API_URL + this.path + '/edit', item, httpOptions).subscribe(data => {
        this.dialogData = item;
        // this.toasterService.showToaster('Successfully edited', 3000);
      },
        (err: HttpErrorResponse) => {
          // this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
        }
      );
    });
  }

  // DELETE METHOD
  deleteItem(id: number): void {
    this.storage.get(environment.TOKEN_KEY).then(token => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: token
        })
      };
      this.httpClient.post(environment.API_URL + this.path + '/delete', { id }, httpOptions).subscribe(data => {
        console.log(data['']);
        // this.toasterService.showToaster('Successfully deleted', 3000);
      },
        (err: HttpErrorResponse) => {
          // this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
        }
      );
    });
  }
}
