import { Component } from '@angular/core';
import { NbWindowRef, NbGlobalPosition, NbGlobalPhysicalPosition, NbComponentStatus, NbToastrService } from '@nebular/theme';
import { NgForm } from '@angular/forms';
import { DossierService } from '../../service/dossier.service';
import { VarConfig } from '../../../../config/var.config';
import { ToasterConfig } from 'angular2-toaster';
import { Router } from '@angular/router';
import { HistoriqueService } from '../../../historique/historique.service';

@Component({
    templateUrl: 'add-element.component.html',
    styleUrls: ['add-element.component.scss'],
})
export class AddElementComponent {

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

    uneDate = new Date();

  constructor(public windowRef: NbWindowRef, 
    private dossierService: DossierService, 
    public vg: VarConfig,
    private toastrService: NbToastrService,
    private router: Router,
    private historiqueService: HistoriqueService) {
  }

  close() {
    this.windowRef.close();
  }

  onSubmit(form: NgForm) {
    let data: any[] = [];
    let dataOrta: any;
    let dataEnd: any;
    const date = this.uneDate.getFullYear() + '-' + (this.uneDate.getMonth() + 1) + '-' + (this.uneDate.getDay() + 1);
    dataOrta = this.windowRef.config.context;
    switch (this.vg.element) {
        case 'allergies':
                for (let i = 0; i < dataOrta.length; i++) {
                   // tslint:disable-next-line: max-line-length
                   data.push({libelle: dataOrta[i].libelle, details: dataOrta[i].details, dateAjout: dataOrta[i].dateAjout});
                }
            data.push({libelle: form.value.libelle, details: form.value.details, dateAjout: date});
            dataEnd = {alergies: data};
            break;

        case 'antecedants':
            for (let i = 0; i < dataOrta.length; i++) {
                   // tslint:disable-next-line: max-line-length
                data.push({libelle: dataOrta[i].libelle, details: dataOrta[i].details, dateAjout: dataOrta[i].dateAjout});
            }
            data.push({libelle: form.value.libelle, details: form.value.details, dateAjout: date});
            dataEnd = {antecedants: data};
            break;

        case 'maladies':
            for (let i = 0; i < dataOrta.length; i++) {
                   // tslint:disable-next-line: max-line-length
                data.push({libelle: dataOrta[i].libelle, details: dataOrta[i].details, dateAjout: dataOrta[i].dateAjout, traitement: dataOrta[i].traitement});
            }
            data.push({libelle: form.value.libelle, details: '-', dateAjout: date, traitement: form.value.details});
            dataEnd = {maladies: data};
            break;

        case 'consultations':
            for (let i = 0; i < dataOrta.length; i++) {
                   // tslint:disable-next-line: max-line-length
                data.push({libelle: dataOrta[i].libelle, details: dataOrta[i].details, dateAjout: dataOrta[i].dateAjout});
            }
            data.push({libelle: form.value.libelle, details: form.value.details, dateAjout: date});
            dataEnd = {consultations: data};
            break;

        case 'examen':
            for (let i = 0; i < dataOrta.length; i++) {
                   // tslint:disable-next-line: max-line-length
                data.push({libelle: dataOrta[i].libelle, resultat: dataOrta[i].resultat, dateAjout: dataOrta[i].dateAjout});
            }
            data.push({libelle: form.value.libelle, resultat: form.value.details, dateAjout: date});
            dataEnd = {examens: data};
            break;

        case 'hospitalisation':
            for (let i = 0; i < dataOrta.length; i++) {
                   // tslint:disable-next-line: max-line-length
                data.push({lieu: dataOrta[i].lieu, motif: dataOrta[i].motif, details: dataOrta[i].details, dateAjout: dataOrta[i].dateAjout});
            }
            // tslint:disable-next-line: max-line-length
            data.push({lieu: this.vg.user.response.ref_structure, motif: form.value.libelle, details: form.value.details, dateAjout: date});
            dataEnd = {hospitalisation: data};
            break;

        default:
            this.windowRef.close();
            break;
    }
    this.dossierService.updateDossier(this.vg.idPatient, dataEnd)
    .subscribe((res) => {
        if (res.body.success) {
            this.showToast('success', 'WAFU-Santé', res.body.message);
            this.router.navigate(['/pages/notfound/' + this.vg.telPatient]);
            // tslint:disable-next-line: max-line-length
            this.vg.historyData.action = 'Mise à jour ' + this.vg.element + ' du patient: ' + this.vg.patient.response.personID;
          this.vg.historyData.refStructure = this.vg.user.response.ref_structure;
          this.vg.historyData.refUser = this.vg.user.response._id.toString();
          this.historiqueService.addHistorique(this.vg.historyData)
          .subscribe((res) => {});
            this.windowRef.close();
        } else {
            this.showToast('success', 'WAFU-Santé', res.body.message);
        }
    });
  }
}
