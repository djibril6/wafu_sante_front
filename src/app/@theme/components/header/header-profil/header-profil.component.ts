import { Component } from '@angular/core';
import { NbDialogRef, NbGlobalPosition, NbGlobalPhysicalPosition, NbComponentStatus, NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';

import { VarConfig } from '../../../../config/var.config';
import { ToasterConfig } from 'angular2-toaster';
import { UserService } from '../../../../pages/user/service/user.service';
import { NgForm } from '@angular/forms';
import { HistoriqueService } from '../../../../pages/historique/historique.service';

@Component({
  selector: 'ngx-header-profil',
  templateUrl: 'header-profil.component.html',
  styleUrls: ['header-profil.component.scss'],
})
export class HeaderProfilComponent {

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

  constructor(protected ref: NbDialogRef<HeaderProfilComponent>, 
    private router: Router,
    public vg: VarConfig,
    private toastrService: NbToastrService,
    private userService: UserService,
    private historiqueService: HistoriqueService) {}

  cancel() {
    this.ref.close();
  }

  modifier(form: NgForm) {
    // tslint:disable-next-line: max-line-length
    const data = {nom: form.value.nom, prenom: form.value.prenom, tel: form.value.tel, pwd: form.value.pwd, roles: this.vg.user.response.roles, actif: this.vg.user.response.actif};
    this.userService.updateUser(this.vg.user.response.tel, data)
    .subscribe((res) => {
      if (res.body.success) {
        this.showToast('success', 'WAFU-Santé', res.body.message);
        this.vg.connected = false;
        this.vg.user = {};
        this.vg.historyData.action = 'Modification de compte';
        this.vg.historyData.refStructure = this.vg.user.response.ref_structure;
        this.vg.historyData.refUser = this.vg.user.response._id.toString();
        this.historiqueService.addHistorique(this.vg.historyData)
        .subscribe((res) => {});
        this.router.navigate(['/pages/wafu']);
        this.ref.close();
      } else {
        this.showToast(this.status, this.title, res.body.message);
      }
    });
  }

  logout() {
    this.vg.connected = false;
    this.ref.close();
    this.showToast('danger', 'WAFU-Santé', 'Vous êtes déconnecté!');
    this.router.navigate(['/pages/wafu']);
  }
}
