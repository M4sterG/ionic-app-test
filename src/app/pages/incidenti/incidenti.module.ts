import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncidentiPageRoutingModule } from './incidenti-routing.module';

import { IncidentiPage } from './incidenti.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncidentiPageRoutingModule
  ],
  declarations: [IncidentiPage]
})
export class IncidentiPageModule {}
