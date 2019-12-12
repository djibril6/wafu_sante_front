import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NbWindowRef, NbToastrService, NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition, NbDialogRef } from '@nebular/theme';
import { NgForm } from '@angular/forms';

import { UserService } from '../../../../pages/user/service/user.service';
import { VarConfig } from '../../../../config/var.config';
import { ToasterConfig } from 'angular2-toaster';
import { HistoriqueService } from '../../../../pages/historique/historique.service';

@Component({
  selector: 'ngx-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent {

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

  constructor(private userService: UserService,
    public vg: VarConfig,
    private toastrService: NbToastrService,
    private historiqueService: HistoriqueService,
    protected ref: NbDialogRef<LoginComponent>) {}

  close() {
    this.ref.close();
  }

  onLogin(form: NgForm) {
    this.userService.login(form.value)
      .subscribe((res) => {
        if (res.body.success) {
          this.vg.connected = true;
          this.vg.user = res.body;
          this.showToast('success', 'WAFU-Santé', res.body.message);
          this.vg.historyData.action = 'Connection sur un profil' + this.vg.user.response.roles[0];
          this.vg.historyData.refStructure = this.vg.user.response.ref_structure;
          this.vg.historyData.refUser = this.vg.user.response._id.toString();
          this.historiqueService.addHistorique(this.vg.historyData).subscribe((res) => {});
          this.ref.close();
        } else {
          this.vg.connected = false;
          this.showToast(this.status, this.title, res.body.message);
        }
      });
  }
}
