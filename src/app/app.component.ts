import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { environment } from '../environments/environment';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { v4 as uuid } from 'uuid';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  authenticationState = new BehaviorSubject(false);
  pages: any;
  dark = false;
  enabled = false;
  controlCheck = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: AuthenticationService,
    private router: Router,
    private storage: Storage,
    private changeDetector: ChangeDetectorRef,
  ) {

    this.storage.get(environment.DEVICE_ID).then(res => {
      if (!res) {
        this.storage.set(environment.DEVICE_ID, uuid());
      }
    });

    this.sideMenu();
    this.checkToken();
  }

  refresh() {
    this.changeDetector.detectChanges();
  }

  OnInit() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

  }
  checkToken() {
    this.storage.get(environment.TOKEN_KEY).then(res => {
      if (res == null) {
        this.router.navigate(['login']);
      }
    });
  }

  logout() {
    this.storage.get(environment.DEVICE_ID).then(uuidv4 => {
      this.authenticationService.logout(uuidv4);
      this.router.navigate(['login']);
      this.storage.remove(environment.USER_DATA);
    });
  }
  sideMenu() {
    this.pages =
      [
        {
          title: 'Home',
          url: '/home',
          icon: 'home'
        },
        {
          title: 'Profilo',
          url: '/profilo',
          icon: 'person-circle'
        },
        {
          title: 'Utilizza veicolo',
          url: '/dichiarazioni',
          icon: 'newspaper'
        },
        {
          title: 'Incidenti',
          url: '/incidenti',
          icon: 'bandage'
        },
      ];

    this.storage.get(environment.USER_DATA).then(data => {
      if (data !== null && data.roles.includes('ROLE_ADMIN')) {
        this.pages.push(
          {
            title: 'Gestione documenti',
            url: '/gestione',
            icon: 'bar-chart'
          },
          {
            title: 'Gestione Utenti',
            url: '/utenti',
            icon: 'Person-circle'
          },
          {
            title: 'Gestione Veicoli',
            url: '/veicoli',
            icon: 'bus'
          }
        );

      }
      this.refresh();
    });

  }
}
