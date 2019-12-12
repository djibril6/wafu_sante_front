import { HttpClient, HttpResponse } from '@angular/common/http';

import { VarConfig } from '../../../config/var.config';
import { User, AllUser } from '../../../config/user-model.config';
import { Observable } from 'rxjs';

type EntityResponseType = HttpResponse<User>;
type EntityResponseTypeAll = HttpResponse<AllUser>;

export class UserService {

  link = 'user/';

  constructor(private httpClient: HttpClient, private gb: VarConfig) { }

  getAllUser(structure: string): Observable<EntityResponseTypeAll> {
    const url = this.gb.MAIN_URL + this.link + 'get/all/' + structure;
    return this.httpClient
        .get<AllUser>(url, {observe: 'response'});
  }

  login(data): Observable<EntityResponseType> {
    const url = this.gb.MAIN_URL + this.link + 'auth';
    return this.httpClient
        .post<User>(url, data, {observe: 'response'});
  }

  AddUser(data): Observable<EntityResponseType> {
    const url = this.gb.MAIN_URL + this.link + 'add';
    return this.httpClient
        .post<User>(url, data, {observe: 'response'});
  }

  updateUser(id, data): Observable<EntityResponseType> {
    const url = this.gb.MAIN_URL + this.link + 'update/' + id;
    return this.httpClient
        .patch<User>(url, data, {observe: 'response'});
  }
}
