import { Component, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'ngx-contacts',
  styleUrls: ['./contacts.component.scss'],
  templateUrl: './contacts.component.html',
})
export class ContactsComponent implements OnDestroy {
  @Input() contactPatient: {
    personID: string,
    adresse: [{residence: String, region: String, pays: String}],
    telephone: [string],
    contactUrgence: [string],
    email: [string],
    tailles: [{taille: Number, date: string}],
    poids: [{poids: Number, date: string}],
  };

  contactPatient2: {
    personID: string,
    adresse: [{residence: String, region: String, pays: String}],
    telephone: [string],
    contactUrgence: [string],
    email: [string],
    tailles: [{taille: Number, date: string}],
    poids: [{poids: Number, date: string}],
  };

  constructor() {
    setTimeout(() => {
      this.contactPatient2 = this.contactPatient;
    }, 300);
  }

  ngOnDestroy() {
    
  }
}
