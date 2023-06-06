import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VeicoliPage } from './veicoli.page';

const routes: Routes = [
  {
    path: '',
    component: VeicoliPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VeicoliPageRoutingModule {}
