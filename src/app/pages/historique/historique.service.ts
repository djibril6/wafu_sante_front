import { HttpClient, HttpResponse } from '@angular/common/http';

import { History } from '../../config/history-model.config';
import { Observable } from 'rxjs';
import { VarConfig } from '../../config/var.config';

type EntityResponseType = HttpResponse<History>;
type EntityResponseTypeAll = HttpResponse<History>;

export class HistoriqueService {

  link = 'history/';

  constructor(private httpClient: HttpClient, private gb: VarConfig) { }

  getHistorique(structure: string): Observable<EntityResponseTypeAll> {
    const url = this.gb.MAIN_URL + this.link + 'get/' + structure;
    return this.httpClient
        .get<History>(url, {observe: 'response'});
  }

  addHistorique(data): Observable<EntityResponseType> {
    const url = this.gb.MAIN_URL + this.link + 'add';
    return this.httpClient
        .post<History>(url, data, {observe: 'response'});
  }
}
