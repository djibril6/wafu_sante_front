import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/data/smart-table';
import { NbDialogService, NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

import { UserService } from '../service/user.service';
import { User, AllUser } from '../../../config/user-model.config';
import { VarConfig } from '../../../config/var.config';
import { ToasterConfig } from 'angular2-toaster';
import { HistoriqueService } from '../../historique/historique.service';

@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./form-inputs.component.scss'],
  templateUrl: './form-inputs.component.html',
})
export class FormInputsComponent {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    pager: {display: true, perPage: 10},
    columns: {
      tel: {
        title: 'Tel',
        type: 'string',
        editable: false,
      },
      nom: {
        title: 'NOM',
        type: 'string',
        editable: false,
      },
      prenom: {
        title: 'Prénom',
        type: 'string',
        editable: false,
      },
      roles: {
        title: 'Roles',
        type: 'array',
        editor: {
          type: 'list',
          config: {
            list: [
              { value: 'ADMIN', title: 'ADMIN' },
              { value: 'USER', title: 'USER' },
            ],
          },
        },
      },
      dateCreation: {
        title: 'Date de création',
        type: 'string',
        editable: false,
      },
      actif: {
        title: 'Compte actif',
        type: 'string',
        editable: false,
      },
    },
  };

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

  source: LocalDataSource = new LocalDataSource();
  users: AllUser;
  oneUsers: User;

  // tslint:disable-next-line: max-line-length
  constructor(private service: SmartTableData, private dialogService: NbDialogService, private userService: UserService, public vg: VarConfig, private toastrService: NbToastrService, private historiqueService: HistoriqueService) {
    const data = this.service.getData();
    this.source.load(data);
    if (vg.connected) {
      this.geyAllUser();
    }
  }

  geyAllUser() {
    this.userService.getAllUser(this.vg.user.response.ref_structure)
      .subscribe((res) => {
        this.users = res.body;
        this.source.load(this.users.response);
      });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Êtes vous sûr de vouloir Activer/désactiver ce compte?')) {
      if (event.data.roles[0] !== 'ROOT') {
        let user: any;
      if (event.data.actif === 'oui') {
        user = {actif: 'non'};
      } else {
        user = {actif: 'oui'};
      }
      this.userService.updateUser(event.data.tel, user)
      .subscribe((res) => {
        if (res.body.success) {
          this.oneUsers = res.body;
          // event.confirm.resolve();
          this.geyAllUser();
          this.showToast('success', 'WAFU-Santé', res.body.message);
          this.vg.historyData.filtre = 'gestionUser';
          this.vg.historyData.action = 'Mise d\'un compte à un état actif à : ' + user.actif;
          this.vg.historyData.refStructure = this.vg.user.response.ref_structure;
          this.vg.historyData.refUser = this.vg.user.response._id.toString();
          this.historiqueService.addHistorique(this.vg.historyData).subscribe((res) => {});
        } else {
          this.showToast('danger', 'Erreur', res.body.message);
        }
      });
      } else {
        this.showToast('danger', 'Erreur', 'Le compte d\'un super admistrateur ne peut être bloqué');
      }
    } else {
      event.confirm.reject();
    }
  }
  onEditConfirm(event) {
    const user = {roles: [event.newData.roles]};
      this.userService.updateUser(event.data.tel, user)
      .subscribe((res) => {
        if (res.body.success) {
          this.oneUsers = res.body;
          event.confirm.resolve();
          this.vg.historyData.filtre = 'gestionUser';
          this.vg.historyData.action = 'Modification du compte pour un USER vers le role : ' + event.newData.roles;
          this.vg.historyData.refStructure = this.vg.user.response.ref_structure;
          this.vg.historyData.refUser = this.vg.user.response._id.toString();
          this.historiqueService.addHistorique(this.vg.historyData).subscribe((res) => {});
          this.showToast('success', 'WAFU-Santé', res.body.message);
        } else {
          event.confirm.reject();
          this.showToast('danger', 'Erreur', res.body.message);
        }
      });
  }

  createConfirm(event): void {
    if (event.newData.nom && event.newData.prenom && event.newData.tel) {
      const user = {
        nom: event.newData.nom,
        prenom: event.newData.prenom,
        tel: event.newData.tel,
        pwd: this.vg.defaultPWD,
        roles: [event.newData.roles],
        createBy: this.vg.appID,
        actif: 'oui',
        ref_structure: 'Clinique Lahia', // this.vg.user.response.ref_structure,
      };
      if (window.confirm('Êtes vous sûr des informations transmises?')) {
        this.userService.AddUser(user)
        .subscribe((res) => {
          this.oneUsers = res.body;
          if (this.oneUsers.success) {
            event.confirm.resolve();
            this.showToast('success', 'WAFU-Santé', this.oneUsers.message);
            this.vg.historyData.filtre = 'gestionUser';
            this.vg.historyData.action = 'Création de compte User, profil: ' + event.newData.roles;
            this.vg.historyData.refStructure = this.vg.user.response.ref_structure;
            this.vg.historyData.refUser = this.vg.user.response._id.toString();
            this.historiqueService.addHistorique(this.vg.historyData).subscribe((res) => {});
            this.geyAllUser();
          } else {
            this.showToast('danger', 'Erreur', this.oneUsers.message);
          }
        });
      } else {
        event.confirm.reject();
      }
    } else {
      this.showToast('danger', 'Erreur', 'Les Champs Nom, Prénom et Téléphone sont obligatoires');
    }
  }
}

