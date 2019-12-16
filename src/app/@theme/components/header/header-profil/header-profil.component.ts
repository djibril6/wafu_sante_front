import { Component } from '@angular/core';
import { NbDialogRef, NbGlobalPosition, NbGlobalPhysicalPosition, NbComponentStatus, NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';

import { VarConfig } from '../../../../config/var.config';
import { ToasterConfig } from 'angular2-toaster';
import { UserService } from '../../../../pages/user/service/user.service';
import { NgForm, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HistoriqueService } from '../../../../pages/historique/historique.service';

@Component({
  selector: 'ngx-header-profil',
  templateUrl: 'header-profil.component.html',
  styleUrls: ['header-profil.component.scss'],
})
export class HeaderProfilComponent {

  form1: FormGroup;

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
    private historiqueService: HistoriqueService,
    private fb: FormBuilder) {
      if (vg.connected) {
        this.form1 = this.fb.group({
          nom: [vg.user.response.nom, Validators.required],
          prenom: [vg.user.response.prenom, Validators.required],
          tel: [vg.user.response.tel, [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
          pwd: ['', Validators.required],
        });
      }
    }

  cancel() {
    this.ref.close();
  }

  modifier() {
    // tslint:disable-next-line: max-line-length
    const data = {nom: this.form1.value.nom, prenom: this.form1.value.prenom, tel: this.form1.value.tel, pwd: this.form1.value.pwd, roles: this.vg.user.response.roles, actif: this.vg.user.response.actif};
    this.userService.updateUser(this.vg.user.response.tel, data)
    .subscribe((res) => {
      if (res.body.success) {
        this.showToast('success', 'WAFU-Santé', res.body.message);
        this.vg.historyData.filtre = 'gestionUser';
        this.vg.historyData.action = 'Modification de son compte';
        this.vg.historyData.refStructure = this.vg.user.response.ref_structure;
        this.vg.historyData.refUser = this.vg.user.response._id.toString();
        this.historiqueService.addHistorique(this.vg.historyData)
        .subscribe((res) => {});
        this.vg.connected = false;
        this.vg.user = {};
        this.vg.menu = this.vg.getMenu();
        this.router.navigate(['/pages/wafu']);
        this.ref.close();
      } else {
        this.showToast(this.status, this.title, res.body.message);
      }
    });
  }

  logout() {
    this.vg.connected = false;
    this.vg.menu = this.vg.getMenu();
    this.ref.close();
    this.showToast('danger', 'WAFU-Santé', 'Vous êtes déconnecté!');
    this.router.navigate(['/pages/wafu']);
  }
}
