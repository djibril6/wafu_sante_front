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
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { FormInputsComponent } from './form-inputs/form-inputs.component';
import { FormsModule as ngFormsModule, FormsModule } from '@angular/forms';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxEchartsModule } from 'ngx-echarts';
import { UserService } from './service/user.service';

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
    UserRoutingModule,
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
    UserComponent,
    FormInputsComponent,
  ],
  entryComponents: [],
  providers: [UserService],
})
export class UserModule { }
