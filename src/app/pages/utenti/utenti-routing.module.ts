import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UtentiPage } from './utenti.page';

const routes: Routes = [
  {
    path: '',
    component: UtentiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UtentiPageRoutingModule {}
