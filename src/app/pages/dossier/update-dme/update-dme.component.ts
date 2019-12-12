import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { FormDMEComponent } from './form/form.component';

@Component({
  selector: 'ngx-updatedme',
  templateUrl: 'update-dme.component.html',
  styleUrls: ['update-dme.component.scss'],
})
export class UpdateDMEComponent {

  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;
  @ViewChild('disabledEsc', { read: TemplateRef, static: true }) disabledEscTemplate: TemplateRef<HTMLElement>;

  constructor(private windowService: NbWindowService) {}

  openWindow(contentTemplate) {
    this.windowService.open(
      contentTemplate,
      {
        title: 'Window content from template',
        context: {
          text: 'some text to pass into template',
        },
      },
    );
  }

  openWindowForm() {
    this.windowService.open(FormDMEComponent, { title: `Ajouter une information` });
  }

  openWindowWithoutBackdrop() {
    this.windowService.open(
      this.disabledEscTemplate,
      {
        title: 'Window without backdrop',
        hasBackdrop: false,
        closeOnEsc: false,
      },
    );
  }
}
