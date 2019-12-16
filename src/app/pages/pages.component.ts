import { Component } from '@angular/core';

import { VarConfig } from '../config/var.config';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="vg.menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu = [
    {
      title: 'Tableau de bord',
      icon: 'home-outline',
      link: '/pages/dashboard',
      home: true,
    },
    // {
    //   title: 'Dossier',
    //   icon: 'home-outline',
    //   link: '/pages/dossier',
    // },
    {
      title: 'GESTION',
      group: true,
    },
    {
      title: 'Gérer les utilisateurs',
      icon: 'home-outline',
      link: '/pages/users/inputs',
      hidden: false,
    },
    {
      title: 'Historiques',
      icon: 'home-outline',
      link: '/pages/historique/inputs',
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

  constructor(public vg: VarConfig) {}
}
