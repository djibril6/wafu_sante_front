import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbToastrService, NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition, NbDialogRef } from '@nebular/theme';
import { NgForm, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { VarConfig } from '../../../config/var.config';
import { ToasterConfig } from 'angular2-toaster';
import { DossierService } from '../service/dossier.service';
import { Router } from '@angular/router';
import { HistoriqueService } from '../../historique/historique.service';

@Component({
  selector: 'ngx-creer-dme',
  templateUrl: 'creer-dme.component.html',
  styleUrls: ['creer-dme.component.scss'],
})
export class CreerDMEComponent implements OnDestroy, OnInit {

  createDMEData: {
    numCarte: string,
    numPassport: string,
    numCENI: string,
    nom: string,
    prenom: string,
    dateNaiss: string,
    lieuNaiss: {
      region: string,
      pays: string,
    },
    telephone: [string],
    email: [string],
    adresse: [{
      residence: string,
      region: string,
      pays: string,
    }],
    createBy: string,
    groupeSanguin: {
      libelle: string,
      code: string,
    },
    contactUrgence: [string],
    tailles: [{
      taille: Number,
      date: string,
    }],
    poids: [{
      poids: Number,
      date: string,
    }],
    alergies: [{
      libelle: string,
      dateAjout: string,
      details: string,
    }],
    maladies: [{
      libelle: string,
      dateAjout: string,
      details: string,
      traitement: string,
    }],
  };
  tel: string;
  uneDate = new Date();
  dmeData: any;

  form1: FormGroup;
  form2: FormGroup;
  form3: FormGroup;
  form4: FormGroup;
  form5: FormGroup;

   // Tost config
   config: ToasterConfig;
   index = 1;
   destroyByClick = true;
   duration = 3000;
   hasIcon = true;
   position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_LEFT;
   preventDuplicates = false;
   status: NbComponentStatus = 'danger';
   title = 'Erreur!';

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

  constructor(private dossierService: DossierService,
    public vg: VarConfig,
    private toastrService: NbToastrService,
    protected ref: NbDialogRef<CreerDMEComponent>,
    private router: Router,
    private historiqueService: HistoriqueService,
    private fb: FormBuilder) {
      this.createDMEData = {
        numCarte: '...',
        numPassport: '...',
        numCENI: '...',
        nom: '...',
        prenom: '...',
        dateNaiss: '...',
        lieuNaiss: {
          region: '...',
          pays: '...',
        },
        telephone: ['...'],
        email: ['...'],
        adresse: [{
          residence: '...',
          region: '...',
          pays: '...',
        }],
        createBy: '...',
        groupeSanguin: {
          libelle: '...',
          code: '...',
        },
        contactUrgence: ['...'],
        tailles: [{
          taille: 0,
          date: this.uneDate.getFullYear() + '-' + (this.uneDate.getMonth() + 1) + '-' + (this.uneDate.getDay() + 1),
        }],
        poids: [{
          poids: 0,
          date: this.uneDate.getFullYear() + '-' + (this.uneDate.getMonth() + 1) + '-' + (this.uneDate.getDay() + 1),
        }],
        alergies: [{
          libelle: '...',
          // tslint:disable-next-line: max-line-length
          dateAjout: this.uneDate.getFullYear() + '-' + (this.uneDate.getMonth() + 1) + '-' + (this.uneDate.getDay() + 1),
          details: '...',
        }],
        maladies: [{
          libelle: '...',
          // tslint:disable-next-line: max-line-length
          dateAjout: this.uneDate.getFullYear() + '-' + (this.uneDate.getMonth() + 1) + '-' + (this.uneDate.getDay() + 1),
          details: '...',
          traitement: '...',
        }],
      };
    }

  close() {
    this.ref.close();
  }

  ngOnInit() {
    this.form1 = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateNaiss: ['', Validators.required],
      lieuNaiss: ['', Validators.required],
      paysNaiss: ['', Validators.required],
    });

    this.form2 = this.fb.group({
      tel: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      email: ['', Validators.email],
      pays: '',
      region: '',
      residence: '',
      numCarte: '',
      numPassport: '',
      numCENI: '',
      contactUrgence1: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      contactUrgence2: ['', [Validators.minLength(8), Validators.maxLength(12)]],
      contactUrgence3: ['', [Validators.minLength(8), Validators.maxLength(12)]],
    });

    this.form3 = this.fb.group({
      codeGroupe: '',
      poids: ['', Validators.min(0)],
      taille: ['', Validators.min(0)],
    });

    this.form4 = this.fb.group({
      alergies: '',
      detailsAlergies: '',
    });

    this.form5 = this.fb.group({
      maladies: '',
      traitementMaladies: '',
      checkbox: ['', Validators.required],
    });
  }

  ngOnDestroy() {
    if (this.tel) {
      this.router.navigate(['/pages/notfound/' + this.tel]);
    } else {
      this.router.navigate(['/pages/wafu']);
    }
  }

  onCreateDME1(data?) {
    this.form1.markAsDirty();
    let formValue = data;
    this.createDMEData.nom = formValue.nom;
    this.createDMEData.prenom = formValue.prenom;
    this.createDMEData.dateNaiss = formValue.dateNaiss;

    if (!formValue.paysNaiss) formValue.paysNaiss = '...';
    if (formValue.lieuNaiss) this.createDMEData.lieuNaiss = {region: formValue.lieuNaiss, pays: formValue.paysNaiss};
  }
  onCreateDME2(data?) {
    this.form2.markAsDirty();
    let formValue = data;
    if (formValue.tel) this.createDMEData.telephone = [formValue.tel];

    if (formValue.email) this.createDMEData.email = [formValue.email];

    if (!formValue.region) formValue.region = '...';
    if (!formValue.pays) formValue.pays = '...';
    // tslint:disable-next-line: max-line-length
    if (formValue.residence) this.createDMEData.adresse = [{residence: formValue.residence, region: formValue.region, pays: formValue.pays}];

    if (!formValue.numCarte) formValue.numCarte = '...';
    if (!formValue.numPassport) formValue.numPassport = '...';
    if (!formValue.numCENI) formValue.numCENI = '...';
    this.createDMEData.numPassport = formValue.numPassport;
    this.createDMEData.numCENI = formValue.numCENI;
    this.createDMEData.numCarte = formValue.numCarte;

    if (formValue.contactUrgence1) {
      this.createDMEData.contactUrgence = [formValue.contactUrgence1];
      if (formValue.contactUrgence2) this.createDMEData.contactUrgence.push(formValue.contactUrgence2);
      if (formValue.contactUrgence3) this.createDMEData.contactUrgence.push(formValue.contactUrgence3);
    } else if (formValue.contactUrgence2) {
      this.createDMEData.contactUrgence = [formValue.contactUrgence2];
      if (formValue.contactUrgence3) this.createDMEData.contactUrgence.push(formValue.contactUrgence3);
    } else if (formValue.contactUrgence3) {
      this.createDMEData.contactUrgence = [formValue.contactUrgence3];
    }
  }
  onCreateDME3(data?) {
    this.form3.markAsDirty();
    let formValue = data;
    // tslint:disable-next-line: max-line-length
    if (formValue.codeGroupe) this.createDMEData.groupeSanguin = {libelle: this.getGroupe(formValue.codeGroupe), code: formValue.codeGroupe};

    // tslint:disable-next-line: max-line-length
    if (formValue.taille) this.createDMEData.tailles = [{taille: +formValue.taille, date: this.uneDate.getFullYear() + '-' + (this.uneDate.getMonth() + 1) + '-' + (this.uneDate.getDay() + 1)}];
    // tslint:disable-next-line: max-line-length
    if (formValue.poids) this.createDMEData.poids = [{poids: +formValue.poids, date: this.uneDate.getFullYear() + '-' + (this.uneDate.getMonth() + 1) + '-' + (this.uneDate.getDay() + 1)}];
  }
  onCreateDME4(data?) {
    this.form4.markAsDirty();
    let formValue = data;
    // tslint:disable-next-line: max-line-length
    if (formValue.alergies) this.createDMEData.alergies = this.getAllergies(formValue.alergies, formValue.detailsAlergies);
  }
  onCreateDME5() {
    this.form5.markAsDirty();
    this.onCreateDME1(this.form1.value);
    this.onCreateDME2(this.form2.value);
    this.onCreateDME3(this.form3.value);
    this.onCreateDME4(this.form4.value);
    let formValue = this.form5.value;
    // tslint:disable-next-line: max-line-length
    if (formValue.maladies) this.createDMEData.maladies = this.getMaladies(formValue.maladies, formValue.traitementMaladies);
    this.onCreateDME();
  }
  onCreateDME() {
    this.createDMEData.createBy = this.vg.appID;

    this.dossierService.addDossier(this.createDMEData)
      .subscribe((res) => {
        if (res.body.success) {
          this.vg.patient = res.body;
          this.showToast('success', 'WAFU-Santé', res.body.message);
          this.tel = this.form2.value.tel;
          this.vg.historyData.filtre = 'DME';
          this.vg.historyData.action = 'Création de dossier Médical';
          this.vg.historyData.refStructure = this.vg.user.response.ref_structure;
          this.vg.historyData.refUser = this.vg.user.response._id.toString();
          this.historiqueService.addHistorique(this.vg.historyData)
          .subscribe((res) => {});
          this.ref.close();
        } else {
          this.showToast(this.status, this.title, res.body.message);
        }
      });
  }

  // uploadIMG(form: NgForm) {
  //   const formData: FormData = new FormData();
  //   formData.append('file', file, form.value.file);
  // }

  getGroupe(groupe: string) {
    switch (groupe) {
      case 'A+':
        return 'A Rhésius positif';
        break;
      case 'B+':
        return 'B Rhésius positif';
        break;

      case 'AB+':
        return 'AB Rhésius positif';
        break;
      case 'O+':
        return 'O Rhésius positif';
        break;

      case 'A-':
        return 'A Rhésius négatif';
        break;
      case 'B-':
        return 'B Rhésius négatif';
        break;

      case 'AB-':
        return 'AB Rhésius négatif';
        break;
      case 'O-':
        return 'O Rhésius négatif';
        break;

      default:
          return '-';
        break;
    }
  }
  getAllergies(alergies, detailsAlergies) {
    let res: [{
      libelle: string,
      dateAjout: string,
      details: string,
    }];
    const allergiesTab = alergies.split(';');
    const detailsAllergiesTab = detailsAlergies.split(';');
    let test = true;
    for (let i = 0; i < allergiesTab.length; i++) {
      if (detailsAllergiesTab[i] === '') detailsAllergiesTab[i] = '...';
      if (test) {
        test = false;
        res = [{
          libelle: allergiesTab[i],
          details: detailsAllergiesTab[i],
          // tslint:disable-next-line: max-line-length
          dateAjout: this.uneDate.getFullYear() + '-' + (this.uneDate.getMonth() + 1) + '-' + (this.uneDate.getDay() + 1),
        }];
      } else {
        res.push({
          libelle: allergiesTab[i],
          details: detailsAllergiesTab[i],
          // tslint:disable-next-line: max-line-length
          dateAjout: this.uneDate.getFullYear() + '-' + (this.uneDate.getMonth() + 1) + '-' + (this.uneDate.getDay() + 1),
        });
      }
    }
    return res;
  }
  getMaladies(maladies, traitementMaladies) {
    let res: [{
      libelle: string,
      dateAjout: string,
      details: string,
      traitement: string,
    }];
    let test = true;
    const maladiesTab = maladies.split(';');
    const detailsMaladiesTab = traitementMaladies.split(';');
    for (let i = 0; i < maladiesTab.length; i++) {
      if (detailsMaladiesTab[i] === '') detailsMaladiesTab[i] = '...';
      if (test) {
        test = false;
        res = [{
          libelle: maladiesTab[i],
          details: '-',
          traitement: detailsMaladiesTab[i],
          // tslint:disable-next-line: max-line-length
          dateAjout: this.uneDate.getFullYear() + '-' + (this.uneDate.getMonth() + 1) + '-' + (this.uneDate.getDay() + 1),
        }];
      } else {
        res.push({
          libelle: maladiesTab[i],
          details: '-',
          traitement: detailsMaladiesTab[i],
          // tslint:disable-next-line: max-line-length
          dateAjout: this.uneDate.getFullYear() + '-' + (this.uneDate.getMonth() + 1) + '-' + (this.uneDate.getDay() + 1),
        });
      }
    }
    return res;
  }
}
