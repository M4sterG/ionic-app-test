import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperopasswordPage } from './recuperopassword.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperopasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperopasswordPageRoutingModule {}
