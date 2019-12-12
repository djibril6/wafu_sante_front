import { Component, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { LoginComponent } from './login/login.component';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { VarConfig } from '../../config/var.config';

@Component({
  selector: 'ngx-wafu',
  styleUrls: ['./wafu.component.scss'],
  templateUrl: './wafu.component.html',
})
export class WafuComponent implements OnInit {

  constructor(private windowService: NbWindowService, private router: Router, public vg: VarConfig) {
  }

  ngOnInit() {
    if (!this.vg.connected) {
      this.openWindowForm();
    }
  }

  openWindowForm() {
    this.windowService.open(LoginComponent, { title: `Login` });
  }

  onSearch(form: NgForm) {
    const url = '/pages/dossier/' + form.value.tel;
    this.router.navigate([url]);
  }
}
