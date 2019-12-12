import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { VarConfig } from '../../../config/var.config';
import { Patient } from '../../../config/patient-model.config';
import { Observable } from 'rxjs';

type EntityResponseType = HttpResponse<Patient>;

// @Injectable()
export class DossierService {

  dossierSubject = new Subject<any[]>();
  patient: Patient;
  link = 'patient/';

  constructor(private httpClient: HttpClient, public gb: VarConfig) { }

  getDossier(tel: string): Observable<EntityResponseType> {
    const url = this.gb.MAIN_URL + this.link + 'get/' + tel;
    return this.httpClient
        .get<Patient>(url, {observe: 'response'});
  }

  addDossier(data) {
    const url = this.gb.MAIN_URL + this.link + 'add';
    return this.httpClient
        .post<Patient>(url, data, {observe: 'response'});
  }

  updateDossier(id, data) {
    const url = this.gb.MAIN_URL + this.link + 'update/' + id;
    return this.httpClient
        .patch<Patient>(url, data, {observe: 'response'});
  }
}
