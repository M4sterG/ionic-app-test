import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GestionePage } from './gestione.page';

describe('GestionePage', () => {
  let component: GestionePage;
  let fixture: ComponentFixture<GestionePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
