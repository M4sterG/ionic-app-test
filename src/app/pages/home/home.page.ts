import { environment } from './../../../environments/environment';
import { Storage } from '@ionic/storage';
import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, ViewChildren } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { IonSlides, MenuController } from '@ionic/angular';
import { fromEventPattern } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username: string;
  constructor(
    private storage: Storage
  ) {
    
  }

}
