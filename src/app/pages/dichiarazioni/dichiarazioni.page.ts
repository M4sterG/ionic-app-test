import { CanvasDrawer } from './../../util/canvas-drawer';
import { CarrierData } from './../veicoli/veicoli.page';
import { HttpService } from './../../services/http.service';
import { Storage } from '@ionic/storage';
import { environment } from '../../../environments/environment';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { damageMap, positionMap, typeMap } from 'src/app/models/util';

export interface VehicleData {
  results: [
    {
      id: number,
      licensePlate: string,
      name: string,
      description: string,
      immatriculation: string,
      vin: string,
      image: string,
    }
  ];
  total: number;
  fetched: number;
}

export interface AssessmentData {
  results: [{
    id: number,
    createdAt: string,
    notes: string,
    damage: [{
      position: string,
      relativePosition: string,
      type: string,
      actionRequired: string,
      picture: {
        path: string,
      }
    }]
  }];
  total: number;
  fetched: number;
}

interface Damage {
  position: string;
  relativePosition: string;
  type: string;
  actionRequired: string;
  picture: Blob;
}
@Component({
  selector: 'app-dichiarazioni',
  templateUrl: './dichiarazioni.page.html',
  styleUrls: ['./dichiarazioni.page.scss'],
})
export class DichiarazioniPage implements OnInit {

  @ViewChild('slides') slides;
  @ViewChild('plate') plate;
  @ViewChild('vehicleInfo') vehicleInfo;
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('radio') radio;
  @ViewChild('position') position;
  @ViewChild('rel_position') relativePosition;
  @ViewChild('dam_type') type;

  authenticationState = new BehaviorSubject(false);
  vehicles: VehicleData = null;
  assessments: AssessmentData = null;
  options: string[] = [];
  vehicleName: string;
  vehicleDescription = '';
  vehicleImmatriculation = '';
  vehicleImage = '../../../assets/img/blank.png';
  vehicleVin = '';
  url = environment.HOST_URL;

  damageMap = damageMap;
  typeMap = typeMap;
  positionMap = positionMap;

  positionKeys = Object.keys(this.damageMap);
  relativePositionKeys = Object.keys(this.positionMap);
  typeKeys = Object.keys(this.typeMap);

  hasNewDamage = false;

  damages: Damage[] = new Array();
  damagesIn: any[] = new Array();

  httpAssessmentService: HttpService<AssessmentData> | null;
  httpCarrierService: HttpService<CarrierData> | null;

  canvasDrawer: CanvasDrawer | null;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private changeDetector: ChangeDetectorRef,
  ) {
    this.httpAssessmentService = new HttpService(http, storage);
    this.httpCarrierService = new HttpService(http, storage);
    this.httpAssessmentService.setPath('assessment');
    this.httpCarrierService.setPath('carrier');
    this.fetchVehicleData();
  }
  ngOnInit() {
  }

  lock() {
    this.slides.lockSwipeToNext(true);
    this.slides.lockSwipeToPrev(true);
  }

  refresh() {
    this.changeDetector.detectChanges();
  }
  slideNext() {
    this.slides.lockSwipeToNext(false);
    this.slides.slideNext();
    if (this.plate.value !== undefined) {
      this.fetchAssessmentData(this.vehicles.results[this.options.indexOf(this.plate.value)].id);
    }
    this.slides.lockSwipeToNext(true);
  }

  slidePrev() {
    this.slides.lockSwipeToPrev(false);
    this.slides.slidePrev();
    this.slides.lockSwipeToPrev(true);
  }

  onChange(event) {
    const i = this.options.indexOf(event.target.value);
    this.vehicleName = this.vehicles.results[i].name;
    this.vehicleDescription = this.vehicles.results[i].description;
    this.vehicleImmatriculation = this.vehicles.results[i].immatriculation;
    this.vehicleVin = this.vehicles.results[i].vin;
    if (this.vehicles.results[i].image != null) {
      this.vehicleImage = this.vehicles.results[i].image;
    }
    else {
      this.vehicleImage = '../../../assets/img/blank.png';
    }
  }

  radioChange(event: CustomEvent) {
    this.hasNewDamage = (event.detail.value === 'true');
    this.refresh();
  }

  async addElement() {
    // TODO get value dal form verificando che siano settate
    const damage: Damage = {
      position: await this.position.value,
      relativePosition: await this.relativePosition.value,
      type: await this.type.value,
      actionRequired: '',
      picture: null,
    };
    
    this.damages.push(damage);
    this.refresh();
  }

  async fetchAssessmentData(id: number) {
    (await this.httpAssessmentService.get(new HttpParams().set('id', id.toString()), '/getById')).subscribe(
      data => {
        this.assessments = data as unknown as AssessmentData;
        this.damagesIn = [];
        console.log(this.assessments);
        this.assessments.results.forEach(res => {
          res.damage.forEach(dam => {
            this.damagesIn.push(dam);
          });
        });
        this.refresh();
      },
      error => {
        this.httpCarrierService.handleError(error);
      }
    );
  }

  async fetchVehicleData() {
    (await this.httpCarrierService.get(null, null)).subscribe(
      data => {
        this.vehicles = data as unknown as VehicleData;
        // console.log(data);
        this.vehicles.results.forEach(res => {
          this.options.push(res.licensePlate);
        });
        this.refresh();
      },
      error => {
        this.httpAssessmentService.handleError(error);
      }
    );
  }
df
  initializeCanvas() {
    this.canvasDrawer = new CanvasDrawer(this.canvas);
  }
}
