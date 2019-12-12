import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DossierComponent } from './dossier/dossier.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { WafuComponent } from './wafu/wafu.component';
import { AuthGuard, AuthADMINGuard } from './auth.service';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      canActivate: [AuthGuard],
      component: ECommerceComponent,
    },
    {
      path: 'dossier/:tel',
      canActivate: [AuthGuard],
      component: DossierComponent,
    },
    {
      path: 'users',
      canActivate: [AuthADMINGuard],
      loadChildren: () => import('./user/user.module')
        .then(m => m.UserModule),
    },
    {
      path: 'historique',
      canActivate: [AuthADMINGuard],
      loadChildren: () => import('./historique/historique.module')
        .then(m => m.HistoriqueModule),
    },
    {
      path: 'help',
      loadChildren: () => import('./help/help.module')
        .then(m => m.HelpModule),
    },
    {
      path: 'wafu',
      component: WafuComponent,
    },
    {
      path: '',
      redirectTo: 'wafu',
      pathMatch: 'full',
    },
    {
      path: 'notfound/:tel',
      component: NotFoundComponent,
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
