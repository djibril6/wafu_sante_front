import { Component } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { NgForm } from '@angular/forms';
import { DossierService } from '../../service/dossier.service';

@Component({
    templateUrl: 'form.component.html',
  styleUrls: ['form.component.scss'],
})
export class FormDMEComponent {
  constructor(public windowRef: NbWindowRef, private dossierService: DossierService) {}

  close() {
    this.windowRef.close();
  }

  onSubmit(form: NgForm) {
    const data = {
      
    };
  }
}
