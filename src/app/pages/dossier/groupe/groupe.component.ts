import { delay } from 'rxjs/operators';
import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbWindowService } from '@nebular/theme';
import { AddGroupeComponent } from './add-groupe/add-groupe.component';

declare const echarts: any;

@Component({
  selector: 'ngx-groupe',
  styleUrls: ['./groupe.component.scss'],
  template: `
    <nb-card size="tiny" class="solar-card">
      <nb-card-header>Groupe sanguin</nb-card-header>
      <nb-card-body>
        <div class="echart"></div>
        <div class="info">
          <div class="h4 value"><span>{{ groupePatient?.code }}</span></div>
          <div class="details subtitle-2"><span>{{ groupePatient?.libelle }}</span></div><br>
          <button (click)="onModifierGroupe()" nbButton status="primary">Modifier</button>
        </div>
      </nb-card-body>
    </nb-card>
  `,
})
export class GroupeComponent implements OnDestroy, OnInit {

  @Input() groupePatient: {
    libelle: string,
    code: string,
  };

  constructor(private theme: NbThemeService, private windowService: NbWindowService) {
  }

  ngOnInit() {}

  ngOnDestroy() {}

  onModifierGroupe() {
    this.windowService.open(AddGroupeComponent, { title: 'Mettre à jour', context:  this.groupePatient });
  }
}
