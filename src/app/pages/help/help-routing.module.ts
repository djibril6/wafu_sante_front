import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpComponent } from './help.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [{
  path: '',
  component: HelpComponent,
  children: [
    {
      path: 'chat',
      component: ChatComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpRoutingModule {
}
