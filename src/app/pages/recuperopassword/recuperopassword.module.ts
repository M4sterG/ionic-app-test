import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperopasswordPageRoutingModule } from './recuperopassword-routing.module';

import { RecuperopasswordPage } from './recuperopassword.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperopasswordPageRoutingModule
  ],
  declarations: [RecuperopasswordPage]
})
export class RecuperopasswordPageModule {}
