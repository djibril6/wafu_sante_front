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
  NbCalendarModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { WafuComponent } from './wafu.component';
import { WeatherComponent } from './weather/weather.component';
import { FormsModule } from '@angular/forms';
import { CalendarComponent } from './calendar/calendar.component';
import { DayCellComponent } from './calendar/day-cell/day-cell.component';
import { LoginComponent } from './login/login.component';
import { WafuPubComponent } from './wafu-pub/wafu-pub.component';

import { UserService } from '../user/service/user.service';

const MODULES = [
  NbDialogModule.forChild(),
  NbWindowModule.forChild(),
  NbCheckboxModule,
  NbPopoverModule,
  NbInputModule,
  NbTooltipModule,
];

@NgModule({
  imports: [
    FormsModule,
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
    NgxEchartsModule,
    NbCalendarModule,
    ...MODULES,
  ],
  declarations: [
    WafuComponent,
    WeatherComponent,
    CalendarComponent,
    DayCellComponent,
    LoginComponent,
    WafuPubComponent,
  ],
  entryComponents: [
    LoginComponent,
  ],
  providers: [UserService],
})
export class WafuModule { }
