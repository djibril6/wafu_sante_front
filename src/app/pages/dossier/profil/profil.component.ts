import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-profil',
  styleUrls: ['./profil.component.scss'],
  templateUrl: './profil.component.html',
})
export class ProfilComponent implements OnDestroy, OnInit {

  @Input() profilPatient: {
    nom: string,
    prenom: string,
    dateNaiss: string,
    lieuNaiss: {region: string, pays: string},
    photoProfil: string,
  };

  currentTheme: string;
  themeSubscription: any;

  constructor(private themeService: NbThemeService) {
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
