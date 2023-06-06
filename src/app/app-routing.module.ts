import { VeicoliPage } from './pages/veicoli/veicoli.page';
import { UtentiPage } from './pages/utenti/utenti.page';
import { GestionePage } from './pages/gestione/gestione.page';
import { IncidentiPage } from './pages/incidenti/incidenti.page';
import { ProfiloPage } from './pages/profilo/profilo.page';
import { DichiarazioniPage } from './pages/dichiarazioni/dichiarazioni.page';
import { LoginPage } from './pages/login/login.page';
import { HomePage } from './pages/home/home.page';
import { NgModule, Component } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePage,
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    component: LoginPage,
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'dichiarazioni',
    component: DichiarazioniPage,
    loadChildren: () => import('./pages/dichiarazioni/dichiarazioni.module').then(m => m.DichiarazioniPageModule)
  },
  {
    path: 'profilo',
    component: ProfiloPage,
    loadChildren: () => import('./pages/profilo/profilo.module').then(m => m.ProfiloPageModule)
  },
  {
    path: 'incidenti',
    component: IncidentiPage,
    loadChildren: () => import('./pages/incidenti/incidenti.module').then(m => m.IncidentiPageModule)
  },
  {
    path: 'gestione',
    component: GestionePage,
    loadChildren: () => import('./pages/gestione/gestione.module').then( m => m.GestionePageModule)
  },
  {
    path: 'recuperopassword',
    loadChildren: () => import('./pages/recuperopassword/recuperopassword.module').then( m => m.RecuperopasswordPageModule)
  },
  {
    path: 'utenti',
    component: UtentiPage,
    loadChildren: () => import('./pages/utenti/utenti.module').then( m => m.UtentiPageModule)
  },
  {
    path: 'veicoli',
    component: VeicoliPage,
    loadChildren: () => import('./pages/veicoli/veicoli.module').then( m => m.VeicoliPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
