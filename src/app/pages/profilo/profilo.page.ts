import { Storage } from '@ionic/storage';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

interface UserData {
  id: number;
  cf: string;
  username: string;
  name: string;
  surname: string;
  email: string;
  roles: string[];
  picture: {
    path: string;
  };
}
@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.page.html',
  styleUrls: ['./profilo.page.scss'],
})
export class ProfiloPage implements OnInit {

  url = environment.HOST_URL;
  userdata: UserData;

  constructor(
    private storage: Storage,
    private changeDetector: ChangeDetectorRef,
  ) {
    this.storage.get(environment.USER_DATA).then(data => {
      this.userdata = data;
      this.refresh();
    });
  }

  refresh() {
    this.changeDetector.detectChanges();
  }

  ngOnInit() {
  }

}
