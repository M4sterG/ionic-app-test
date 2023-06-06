import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DichiarazioniPage } from './dichiarazioni.page';

const routes: Routes = [
  {
    path: '',
    component: DichiarazioniPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DichiarazioniPageRoutingModule {}
