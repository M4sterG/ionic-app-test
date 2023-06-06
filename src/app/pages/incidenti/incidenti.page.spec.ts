import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IncidentiPage } from './incidenti.page';

describe('IncidentiPage', () => {
  let component: IncidentiPage;
  let fixture: ComponentFixture<IncidentiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IncidentiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
