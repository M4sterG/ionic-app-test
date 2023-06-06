
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DichiarazioniPageRoutingModule } from './dichiarazioni-routing.module';

import { DichiarazioniPage } from './dichiarazioni.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DichiarazioniPageRoutingModule,
  ],
  declarations: [DichiarazioniPage]
})
export class DichiarazioniPageModule {}
