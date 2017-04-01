import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Credential } from '../model/credential';
import { Roles } from '../model/roles';
import { Role } from '../model/role';
import { Groups } from '../model/groups';
import { Models } from '../model/models';
import { Filter } from '../model/filter';
import { Filters } from '../model/filters';


import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Info } from './info';


@Injectable()
export class ImsService {

  public info: Info;


  constructor(public http: Http) {
  }

  login(credential: Credential): Observable<any> {
    return this.get(credential, "/rest/info");
  }

  get(credential: Credential, page: string): Observable<any> {
    let headers = this.getHeaders(credential);
    return this.http.get(credential.server + page, { headers: headers }).map(res => res.json());
  }

  post(credential: Credential, page: string, data: any): Observable<any> {
    let headers = this.getHeaders(credential);
    console.log("Execute post to:" + page + "with data:" + data);
    return this.http.post(credential.server + page, data, { headers: headers });
  }

  delete(credential: Credential, page: string): Observable<any> {
    let headers = this.getHeaders(credential);
    console.log("Execute delete to:" + page);
    return this.http.delete(credential.server + page, { headers: headers });
  }

  getHeaders(credential: Credential): Headers {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Allow-Control-Allow-Origin', '*');
    headers.append("Authorization", "Basic " + btoa(credential.username + ":" + credential.password));
    return headers;
  }

  getModels(credential: Credential): Observable<Models> {
    return this.get(credential, "/rest/models/");
  }

  getGroups(credential: Credential): Observable<Groups> {
    return this.get(credential, "/rest/groups");
  }

  getRoles(credential: Credential): Observable<Roles> {
    return this.get(credential, "/rest/roles");
  }

  getRole(credential: Credential, role: Role): Observable<Role> {
    return this.get(credential, "/rest/roles/" + role.id);
  }

  createRole(credential: Credential, role: Role) {
    return this.post(credential, "/rest/roles", role);
  }

  getFilters(credential: Credential): Observable<Filters> {
    return this.get(credential, "/rest/filters");
  }

  createFilter(credential: Credential, filter: Filter) {
    return this.post(credential, "/rest/filters", filter);
  }

  deleteRole(credential: Credential, role: Role) {
    return this.delete(credential, "/rest/roles/" + role.id);
  }

  getInfo(credential: Credential): Observable<Info> {
    return this.get(credential, "/rest/info");
  }
}
