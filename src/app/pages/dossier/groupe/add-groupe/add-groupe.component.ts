import { Component } from '@angular/core';
import { NbWindowRef, NbGlobalPosition, NbGlobalPhysicalPosition, NbComponentStatus, NbToastrService } from '@nebular/theme';
import { NgForm } from '@angular/forms';
import { DossierService } from '../../service/dossier.service';
import { VarConfig } from '../../../../config/var.config';
import { ToasterConfig } from 'angular2-toaster';
import { Router } from '@angular/router';
import { HistoriqueService } from '../../../historique/historique.service';

@Component({
    templateUrl: 'add-groupe.component.html',
    styleUrls: ['add-groupe.component.scss'],
})
export class AddGroupeComponent {

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

  getGourpeSanguin(groupe) {
    switch (groupe) {
        case 'A+':
          return {libelle: 'A plus', code: groupe};
          break;
        case 'B+':
          return {libelle: 'B Rhésius positif', code: groupe};
          break;

        default:
            return {};
          break;
      }
  }

  onSubmit(form: NgForm) {
    let data: any;
    let dataEnd: any;

    data = this.getGourpeSanguin(form.value.codeGroupe);
    dataEnd = {groupeSanguin: data};
    this.dossierService.updateDossier(this.vg.idPatient, dataEnd)
    .subscribe((res) => {
        if (res.body.success) {
            this.showToast('success', 'WAFU-Santé', res.body.message);
            this.router.navigate(['/pages/notfound/' + this.vg.telPatient]);
            // tslint:disable-next-line: max-line-length
            this.vg.historyData.action = 'Mise à jour du groupe sanguin du patient: ' + this.vg.patient.response.personID;
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
