
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule} from '@angular/service-worker';
import { environment } from '../environments/environment';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import {DataService} from './services/data.service';

import {AddDialogComponent} from './dialogs/add/add.dialog.component';
import {EditDialogComponent} from './dialogs/edit/edit.dialog.component';
import {DeleteDialogComponent} from './dialogs/delete/delete.dialog.component';

import {AddDialogComponent as AddVeicolo} from './dialogsv/add/add.dialog.component';
import {EditDialogComponent as EditVeicolo} from './dialogsv/edit/edit.dialog.component';
import {DeleteDialogComponent as DeleteVeicolo} from './dialogsv/delete/delete.dialog.component';


import { ReactiveFormsModule} from '@angular/forms';

import {  damageMap, positionMap, typeMap } from 'src/app/models/util';
@NgModule({
  declarations: [
    AppComponent,
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    AddVeicolo,
    EditVeicolo,
    DeleteVeicolo
  ],
  entryComponents: [
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    AddVeicolo,
    EditVeicolo,
    DeleteVeicolo
  ],
  imports: [
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {scope: '/', enabled: environment.production}),
  ],
  providers: [
    DataService,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    InAppBrowser,
    {provide: damageMap, useValue: damageMap},
    {provide: typeMap, useValue: typeMap},
    {provide: positionMap, useValue: positionMap},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
