import { environment } from '../../../environments/environment';
import { Storage } from '@ionic/storage';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthenticationService } from './../../services/authentication.service';
import { Router } from '@angular/router';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { AnimationBuilder } from '@angular/animations';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  @ViewChild('username') username;
  @ViewChild('password') password;
  ngOnInit() {
    this.storage.get(environment.TOKEN_KEY).then(token => {
      if (token !== null)
      {
        console.log(token);
        this.router.navigate(['home']);
      }
    });
  }
  constructor(
    public menuCtrl: MenuController,
    private authService: AuthenticationService,
    public router: Router,
    private storage: Storage,
    public alertController: AlertController,
    public toastController: ToastController,
    public loadingController: LoadingController,
  ) {
    this.menuCtrl.enable(false);
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }

  login() {
    // console.log(this.email);
    // console.log(this.password);

    // TODO: aggiungere messaggi di errore e caricamento login
    if (this.username.value.length >= 3 && this.password.value.length >= 3) {
      this.presentLoading();
      this.storage.get(environment.DEVICE_ID).then(uuid => {
            this.authService.login(
              this.username.value, this.password.value, uuid, this);
      });
    }
  }

  success() {
    this.loadingController.dismiss();
    this.router.navigate(['home']);
  }

  async loginFail() {
    this.loadingController.dismiss();
    const toast = await this.toastController.create({
      header: '',
      cssClass: 'alert-custom',
      message: 'Password errata',
      position: 'middle',
      animated: true,
      color: 'danger',
      mode: 'ios',
      duration: 2000,
    });
    toast.present();
  }

  async invalidUsername() {
    this.loadingController.dismiss();
    const toast = await this.toastController.create({
      cssClass: 'alert-custom',
      header: '',
      message: 'Username errato, riprovare',
      position: 'middle',
      animated: true,
      color: 'danger',
      mode: 'ios',
      duration: 2000,
    });
    await toast.present();
  }

  async connectionFailed() {
    this.loadingController.dismiss();
    const toast = await this.toastController.create({
      header: '',
      cssClass: 'toast-custom',
      message: 'Connessione fallita. Assicurati di avere una connessione a internet funzionante per utilizzare l\'app.',
      position: 'middle',
      animated: true,
      color: 'danger',
      mode: 'ios',
      duration: 2000,
    });
    toast.present();
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      subHeader: 'Inserisci l\'email di registrazione per recuperare le credenzali',
      cssClass: 'alert-custom',
      inputs: [
        {
          name: 'emailRecover',
          type: 'email',
          placeholder: ''
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });
    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Logging in...',
      duration: 10000,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
}

