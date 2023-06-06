import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recuperopassword',
  templateUrl: './recuperopassword.page.html',
  styleUrls: ['./recuperopassword.page.scss'],
})
export class RecuperopasswordPage implements OnInit {

  submitted = false;
  supportMessage: string;
  pc = false;

  constructor(
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public menuCtrl: MenuController,
  ) {
    this.menuCtrl.enable(false);
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
    if (window.screen.width > 360) { // 768px portrait
      this.pc = true;
    }
  }

  async ionViewDidEnter() {
    const toast = await this.toastCtrl.create({
      message: 'This does not actually send a support request.',
      duration: 3000
    });
    await toast.present();
  }

  async submit(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.supportMessage = '';
      this.submitted = false;

      const toast = await this.toastCtrl.create({
        message: 'Your support request has been sent.',
        duration: 3000
      });
      await toast.present();
    }
  }
}
