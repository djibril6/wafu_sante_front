import { Component, Input } from '@angular/core';
// tslint:disable-next-line: max-line-length
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder, NbDialogService } from '@nebular/theme';
import { HistoriqueService } from '../historique.service';
import { History } from '../../../config/history-model.config';
import { VarConfig } from '../../../config/var.config';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  profil?: string;
  date?: string;
  utilisateur?: string;
  action?: string;
  kind?: string;
}

@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./form-inputs.component.scss'],
  templateUrl: './form-inputs.component.html',
})
export class FormInputsComponent {

  customColumn = 'utilisateur';
  defaultColumns = [ 'profil', 'action', 'date' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  starRate = 2;
  heartRate = 4;
  radioGroupValue = 'This is value 2';
  allHistory: History;
  private data: TreeNode<FSEntry>[] = [];

  // tslint:disable-next-line: max-line-length
  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>, private dialogService: NbDialogService, private historiqueService: HistoriqueService, public vg: VarConfig) {
    if (vg.connected) {
      this.historiqueService.getHistorique(this.vg.user.response.ref_structure)
      .subscribe((res) => {
        if (res.body.success) {
          res.body.response.forEach(h => {
            this.data.push({data: {
              utilisateur: h.tel,
              profil: h.profil[0],
              action: h.action,
              date: h.dateAction,
              kind: 'dir',
            }});
          });
          console.log(this.data);
          this.dataSource = this.dataSourceBuilder.create(this.data);
        } else {}
      });
    }
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }
}

@Component({
  selector: 'ngx-fs-icon',
  template: `
    <nb-tree-grid-row-toggle [expanded]="expanded" *ngIf="isDir(); else fileIcon">
    </nb-tree-grid-row-toggle>
    <ng-template #fileIcon>
      <nb-icon icon="file-text-outline"></nb-icon>
    </ng-template>
  `,
})
export class FsIconComponent {
  @Input() kind: string;
  @Input() expanded: boolean;

  isDir(): boolean {
    return this.kind === 'dir';
  }
}
