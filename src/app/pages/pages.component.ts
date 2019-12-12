import { Component } from '@angular/core';

import { MENU_ITEMS, MENU_ITEMS_ADMIN, MENU_ITEMS_USER } from './pages-menu';
import { VarConfig } from '../config/var.config';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS_ADMIN;

  constructor(private vg: VarConfig) {
    if (vg.connected) {
      if (vg.user.response.roles.includes('ADMIN')) {
        this.menu = MENU_ITEMS_ADMIN;
        console.log('yeahhhh');
      } else {
        this.menu = MENU_ITEMS_USER;
        console.log('yeah');
      }
    } else {
      this.menu = MENU_ITEMS_ADMIN;
    }
  }
}
