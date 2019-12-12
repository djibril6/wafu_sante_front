import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DossierModule } from './dossier/dossier.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { WafuModule } from './wafu/wafu.module';
import { AuthGuard, AuthADMINGuard } from './auth.service';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DossierModule,
    ECommerceModule,
    MiscellaneousModule,
    WafuModule,
  ],
  declarations: [
    PagesComponent,
  ],
  providers: [AuthGuard, AuthADMINGuard],
})
export class PagesModule {
}
