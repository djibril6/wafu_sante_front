import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HistoriqueComponent } from './historique.component';
import { FormInputsComponent } from './form-inputs/form-inputs.component';

const routes: Routes = [
  {
    path: '',
    component: HistoriqueComponent,
    children: [
      {
        path: 'inputs',
        component: FormInputsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class HistoriqueRoutingModule {
}

