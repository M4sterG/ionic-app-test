import { Storage } from '@ionic/storage';
import { environment } from '../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

interface SearchResults {
  results: [
    {
      id: number,
      licensePlate: string,
      name: string,
      description: string,
      immatriculation: string,
      vin: string,
    }
  ];
}

@Component({
  selector: 'app-incidenti',
  templateUrl: './incidenti.page.html',
  styleUrls: ['./incidenti.page.scss'],
})
export class IncidentiPage implements OnInit {
  authenticationState = new BehaviorSubject(false);
  options: string[] = [];
  path: string;
  imgURL;
  headers;

  constructor(
    private http: HttpClient,
    private storage: Storage,
  ) {
    this.path = 'carrier/get';
    this.fetchLicensePlateData();
    console.log(this.options);
  }
  ngOnInit() {
  }

  fetchLicensePlateData() {
    this.storage.get(environment.TOKEN_KEY).then(token => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          Authorization: token
        })
      };
      this.http.get<SearchResults>(
        environment.API_URL + this.path,
        httpOptions).subscribe(
        data => {
          data.results.forEach(res => {
            this.options.push(res.licensePlate);
          });
          console.log(this.options);
        },
        error => {
          console.log(this.headers);
          console.log(error);
         },
      );
    });
  }
}
