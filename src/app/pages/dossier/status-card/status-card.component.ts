import { Component, Input, ViewChild, TemplateRef } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { AddElementComponent } from './add-element/add-element.component';
import { VarConfig } from '../../../config/var.config';

@Component({
  selector: 'ngx-status-card',
  styleUrls: ['./status-card.component.scss'],
  template: `
    <nb-card (click)="openElement()" [ngClass]="{'off': false}">
      <div class="icon-container">
        <div class="icon status-{{ type }}">
          <ng-content></ng-content>
        </div>
      </div>

      <div class="details">
        <div class="title h5">{{ title }}</div>
        <div class="status paragraph-2">{{ nombre }} Enregistrements</div>
      </div>
    </nb-card>
  `,
})
export class StatusCardComponent {
  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;
  @ViewChild('disabledEsc', { read: TemplateRef, static: true }) disabledEscTemplate: TemplateRef<HTMLElement>;

  @Input() title: string;
  @Input() type: string;
  @Input() nombre = 0;
  @Input() element: string;
  @Input() elementObject: any[];

  constructor(private windowService: NbWindowService, public vg: VarConfig) {}

  openElement() {
    this.vg.element = this.element;
    this.windowService.open(AddElementComponent, { title: this.title, context:  this.elementObject });
  }
}
