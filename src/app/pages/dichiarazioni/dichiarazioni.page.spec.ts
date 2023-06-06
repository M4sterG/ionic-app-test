import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DichiarazioniPage } from './dichiarazioni.page';

describe('DichiarazioniPage', () => {
  let component: DichiarazioniPage;
  let fixture: ComponentFixture<DichiarazioniPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DichiarazioniPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DichiarazioniPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
