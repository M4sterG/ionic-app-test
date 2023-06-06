import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionePage } from './gestione.page';

const routes: Routes = [
  {
    path: '',
    component: GestionePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionePageRoutingModule {}
