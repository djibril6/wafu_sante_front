import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NbWindowRef, NbToastrService, NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition } from '@nebular/theme';
import { NgForm } from '@angular/forms';

import { UserService } from '../../user/service/user.service';
import { VarConfig } from '../../../config/var.config';
import { ToasterConfig } from 'angular2-toaster';
import { PassThrough } from 'stream';
import { HistoriqueService } from '../../historique/historique.service';

@Component({
  selector: 'ngx-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent {

  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;
  @ViewChild('disabledEsc', { read: TemplateRef, static: true }) disabledEscTemplate: TemplateRef<HTMLElement>;

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

  constructor(public windowRef: NbWindowRef, 
    private userService: UserService, 
    public vg: VarConfig,
    private toastrService: NbToastrService,
    private historiqueService: HistoriqueService) {}

  close() {
    this.windowRef.close();
  }

  onLogin(form: NgForm) {
    this.userService.login(form.value)
      .subscribe((res) => {
        if (res.body.success) {
          this.vg.connected = true;
          this.vg.user = res.body;
          console.log(this.vg.user);
          this.showToast('success', 'WAFU-Santé', res.body.message);
          this.vg.historyData.action = 'Connection sur un profil' + this.vg.user.response.roles[0];
          this.vg.historyData.refStructure = this.vg.user.response.ref_structure;
          this.vg.historyData.refUser = this.vg.user.response._id.toString();
          this.historiqueService.addHistorique(this.vg.historyData)
          .subscribe((res) => {});
          this.windowRef.close();
        } else {
          this.vg.connected = false;
          this.showToast(this.status, this.title, res.body.message);
        }
      });
  }
}
