import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbTreeGridModule,
  NbTabsetModule,
  NbListModule,
  NbWindowModule,
  NbDialogModule,
  NbTooltipModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { HistoriqueRoutingModule } from './historique-routing.module';
import { HistoriqueComponent } from './historique.component';
import { FormInputsComponent } from './form-inputs/form-inputs.component';
import { FormsModule as ngFormsModule, FormsModule } from '@angular/forms';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FsIconComponent } from './form-inputs/form-inputs.component';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  imports: [
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    HistoriqueRoutingModule,
    NbSelectModule,
    NbIconModule,
    ngFormsModule,
    NbTreeGridModule,
    Ng2SmartTableModule,
    FormsModule,
    NbTabsetModule,
    NbListModule,
    NgxEchartsModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    NbCheckboxModule,
    NbInputModule,
    NbTooltipModule,
  ],
  declarations: [
    HistoriqueComponent,
    FormInputsComponent,
    FsIconComponent,
  ],
  entryComponents: [],
  providers: [],
})
export class HistoriqueModule { }
