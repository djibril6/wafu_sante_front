import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
  NbDialogModule,
  NbWindowModule,
  NbCheckboxModule,
  NbPopoverModule,
  NbInputModule,
  NbTooltipModule,
  NbAccordionModule,
  NbStepperModule,
  NbDatepickerModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DossierComponent } from './dossier.component';
import { StatusCardComponent } from './status-card/status-card.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ProfilComponent } from './profil/profil.component';
import { ElectricityComponent } from './electricity/electricity.component';
import { ElectricityChartComponent } from './electricity/electricity-chart/electricity-chart.component';
import { GroupeComponent } from './groupe/groupe.component';
import { UpdateDMEComponent } from './update-dme/update-dme.component';
import { FormDMEComponent } from './update-dme/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DossierService } from './service/dossier.service';
import { CreerDMEComponent } from './creer-dme/creer-dme.component';
import { AddElementComponent } from './status-card/add-element/add-element.component';
import { AddGroupeComponent } from './groupe/add-groupe/add-groupe.component';

const MODULES = [
  NbDialogModule.forChild(),
  NbWindowModule.forChild(),
  NbCheckboxModule,
  NbPopoverModule,
  NbInputModule,
  NbTooltipModule,
  NbAccordionModule,
  NbStepperModule,
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    NgxEchartsModule,
    NbDatepickerModule,
    ...MODULES,
  ],
  declarations: [
    DossierComponent,
    StatusCardComponent,
    ContactsComponent,
    ProfilComponent,
    ElectricityComponent,
    ElectricityChartComponent,
    GroupeComponent,
    UpdateDMEComponent,
    FormDMEComponent,
    CreerDMEComponent,
    AddElementComponent,
    AddGroupeComponent,
  ],
  entryComponents: [
    FormDMEComponent,
    CreerDMEComponent,
    AddElementComponent,
    AddGroupeComponent,
  ],
  providers: [DossierService],
})
export class DossierModule { }
