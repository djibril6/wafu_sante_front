import {Component, OnDestroy, OnInit} from '@angular/core';
// tslint:disable-next-line: max-line-length
import { NbThemeService, NbWindowService, NbToastrService, NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition, NbDialogService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from '../../@core/data/solar';

import { DossierService } from './service/dossier.service';
import { Patient } from '../../config/patient-model.config';
import { ToasterConfig } from 'angular2-toaster';
import { ActivatedRoute } from '@angular/router';
import { VarConfig } from '../../config/var.config';
import { CreerDMEComponent } from './creer-dme/creer-dme.component';
import { HistoriqueService } from '../historique/historique.service';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
  element: string;
  data: any[];
  nombre: Number;
}

@Component({
  selector: 'ngx-dossier',
  styleUrls: ['./dossier.component.scss'],
  templateUrl: './dossier.component.html',
})
export class DossierComponent implements OnDestroy {

  private alive = true;
  private patient: Patient;
  private tel: string;
  profilPatient: {
    nom: string,
    prenom: string,
    dateNaiss: string,
    lieuNaiss: {region: String, pays: String},
    photoProfil: string,
  };
  groupePatient: {
    libelle: String,
    code: String,
  };
  contactPatient: {
    personID: string,
    numCarte?: string,
    numPassport?: string,
    numCENI?: string,
    adresse: [{residence: String, region: String, pays: String}],
    telephone: [string],
    contactUrgence: [string],
    email: [string],
    tailles: [{taille: Number, date: string}],
    poids: [{poids: Number, date: string}],
  };

  solarValue: number;
  allergies: any = {
    title: 'Allergies',
    iconClass: 'far fa-heart',
    type: 'success',
    element: 'allergies',
    data: [],
  };
  antecedants: CardSettings = {
    title: 'Antécédants médicaux',
    iconClass: 'fas fa-medkit',
    type: 'success',
    element: 'antecedants',
    data: [],
    nombre: 0,
  };
  maladies: CardSettings = {
    title: 'Maladies',
    iconClass: 'fas fa-heartbeat',
    type: 'success',
    element: 'maladies',
    data: [],
    nombre: 0,
  };
  consultations: CardSettings = {
    title: 'Consulations',
    iconClass: 'fas fa-prescription',
    type: 'success',
    element: 'consultations',
    data: [],
    nombre: 0,
  };
  examens: CardSettings = {
    title: 'Examens',
    iconClass: 'fas fa-user-md',
    type: 'success',
    element: 'examen',
    data: [],
    nombre: 0,
  };
  hospitalisations: CardSettings = {
    title: 'Hospitalisations',
    iconClass: 'fab fa-accessible-icon',
    type: 'success',
    element: 'hospitalisation',
    data: [],
    nombre: 0,
  };

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.allergies,
    this.antecedants,
    this.maladies,
    this.consultations,
    this.examens,
    this.hospitalisations,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: [
      {
        ...this.allergies,
        type: 'warning',
      },
      {
        ...this.antecedants,
        type: 'primary',
      },
      {
        ...this.maladies,
        type: 'danger',
      },
      {
        ...this.consultations,
        type: 'info',
      },
      {
        ...this.examens,
        type: 'info',
      },
      {
        ...this.hospitalisations,
        type: 'danger',
      },
    ],
    dark: this.commonStatusCardsSet,
  };
  elementObject: any[];

  // Tost config
  config: ToasterConfig;
  index = 1;
  destroyByClick = true;
  duration = 3000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'danger';
  title = 'Erreur!';
  content = `Ce numéro de téléphone n'existe pas`;

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `. ${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      `Toast ${this.index}${titleContent}`,
      config);
  }

  constructor(private themeService: NbThemeService,
              private solarService: SolarData,
              private windowService: NbWindowService,
              public dossierService: DossierService,
              private dialogService: NbDialogService,
              private toastrService: NbToastrService,
              private route: ActivatedRoute,
              private historiqueService: HistoriqueService,
              public vg: VarConfig) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
    });

    this.solarService.getSolarData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.solarValue = data;
      });

      this.tel = route.snapshot.params['tel'];

      if (this.tel === 'creer') {
        this.dialogService.open(CreerDMEComponent, {});
      } else {
        this.getDossierDuPatient(this.tel);
      }
  }

  ngOnDestroy() {
    this.alive = false;
  }

  getDossierDuPatient(tel: string) {
    this.dossierService.getDossier(tel)
    // tslint:disable-next-line: no-console
    .subscribe((res) => {
      this.patient = res.body;
      this.vg.patient = res.body;
      this.vg.idPatient = this.patient.response.id;

      this.setProfilPatient();
      this.setGroupePatient();
      this.setContactPatient();
      this.setElementPatient();

      if (!this.patient.success) {
        this.showToast(this.status, this.title, this.patient.message);
      } else {
        this.vg.historyData.filtre = 'DME';
        this.vg.historyData.action = 'Consultation du dossier médical du patient: ' + this.patient.response.personID;
        this.vg.historyData.refStructure = this.vg.user.response.ref_structure;
        this.vg.historyData.refUser = this.vg.user.response._id.toString();
        this.historiqueService.addHistorique(this.vg.historyData)
          .subscribe((res) => {});
      }
    });
  }
  setElementPatient() {
    if (this.patient.response.alergies) {
      this.allergies.data = this.patient.response.alergies;
      this.allergies.nombre = this.patient.response.alergies.length;
    }
    if (this.patient.response.antecedants) {
      this.antecedants.data = this.patient.response.antecedants;
      this.antecedants.nombre = this.patient.response.antecedants.length;
    }
    if (this.patient.response.maladies) {
      this.maladies.data = this.patient.response.maladies;
      this.maladies.nombre = this.patient.response.maladies.length;
    }
    if (this.patient.response.consultations) {
      this.consultations.data = this.patient.response.consultations;
      this.consultations.nombre = this.patient.response.consultations.length;
    }
    if (this.patient.response.hospitalisation) {
      this.hospitalisations.data = this.patient.response.hospitalisation;
      this.hospitalisations.nombre = this.patient.response.hospitalisation.length;
    }
    if (this.patient.response.examens) {
      this.examens.data = this.patient.response.examens;
      this.examens.nombre = this.patient.response.examens.length;
    }
  }

  setProfilPatient() {
    this.profilPatient = {
      nom : this.patient.response.nom,
      prenom: this.patient.response.prenom,
      dateNaiss: this.patient.response.dateNaiss,
      lieuNaiss: this.patient.response.lieuNaiss,
      photoProfil: this.patient.response.photoProfil,
    };
  }

  setGroupePatient() {
    if (this.patient.response.groupeSanguin) {
      this.groupePatient = {
        libelle: this.patient.response.groupeSanguin.libelle,
        code: this.patient.response.groupeSanguin.code,
      };
    } else {
      this.groupePatient = {
        libelle: '',
        code: '',
      };
    }
  }

  setContactPatient() {
    this.contactPatient = {
      personID: this.patient.response.personID,
      numCarte: this.patient.response.numCarte,
      numPassport: this.patient.response.numPassport,
      numCENI: this.patient.response.numCENI,
      adresse: this.patient.response.adresse,
      telephone: this.patient.response.telephone,
      contactUrgence: this.patient.response.contactUrgence,
      email: this.patient.response.email,
      tailles: this.patient.response.tailles,
      poids: this.patient.response.poids,
    };
  }
}
