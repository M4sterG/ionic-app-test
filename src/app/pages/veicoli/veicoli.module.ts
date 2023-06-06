import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataService} from '../../services/data.service';
import {AddDialogComponent} from '../../dialogs/add/add.dialog.component';
import {EditDialogComponent} from '../../dialogs/edit/edit.dialog.component';
import {DeleteDialogComponent} from '../../dialogs/delete/delete.dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { IonicModule } from '@ionic/angular';

import { VeicoliPageRoutingModule } from './veicoli-routing.module';
import { VeicoliPage } from './veicoli.page';

@NgModule({
  declarations: [VeicoliPage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    HttpClientModule,
    VeicoliPageRoutingModule
  ],
  entryComponents: [
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
  ],
  providers: [
    DataService
  ]
})
export class VeicoliPageModule {}
