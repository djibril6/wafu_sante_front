import { Patient } from './patient-model.config';
import { User } from './user-model.config';
import { HistoryAddData } from './history-model.config';

export class VarConfig {
    public MAIN_URL = 'http://empirewafu.pro/wafu/wafu_sante_back/';
    public urlForIMGUpload = 'http://empirewafu.pro/wafu/wafu_person/';

    public patient: Patient;
    public telPatient: string;
    public idPatient: string;

    public user: User;
    public connected = false;

    public appID = 'AAAAAAAAAAAAA';

    public element: string;
    public defaultPWD = 'wafu1234';

    public historyData: HistoryAddData = {refUser: '-', action: '', refStructure: '-'};

      ADMIN(): boolean {
        if (this.connected) {
          if (this.user.response.roles[0] === 'ADMIN') {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
      ROOT(): boolean {
        if (this.connected) {
          if (this.user.response.roles[0] === 'ROOT') {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
      USER(): boolean {
        if (this.connected) {
          if (this.user.response.roles[0] === 'USER') {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }

    public menu = this.getMenu();

      public getMenu() {
          const menu = [
            {
              title: 'Tableau de bord',
              icon: 'home-outline',
              link: '/pages/dashboard',
              home: true,
              hidden: !(this.ADMIN() || this.ROOT() || this.USER()),
            },
            // {
            //   title: 'Dossier',
            //   icon: 'home-outline',
            //   link: '/pages/dossier',
            // },
            {
              title: 'GESTION',
              group: true,
              hidden: !(this.ADMIN() || this.ROOT()),
            },
            {
              title: 'Gérer les utilisateurs',
              icon: 'home-outline',
              link: '/pages/users/inputs',
              hidden: !(this.ADMIN() || this.ROOT()),
            },
            {
              title: 'Historiques',
              icon: 'home-outline',
              link: '/pages/historique/inputs',
              hidden: !(this.ADMIN() || this.ROOT()),
            },
            {
              title: 'ASSISTANCE',
              group: true,
            },
            {
              title: 'Chat',
              icon: 'message-circle-outline',
              link: '/pages/help/chat',
            },
            // {
            //   title: 'Guide Utilisateur',
            //   icon: 'message-circle-outline',
            //   link: '/pages/help/chat',
            // },
            {
              title: 'A PROPOS',
              group: true,
            },
            {
              title: 'WAFU',
              icon: 'home-outline',
              link: '/pages/wafu',
            },
          ];
          return menu;
      }
}
