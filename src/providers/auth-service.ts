import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ImsService } from './ims-service';
import { Credential } from '../model/credential';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  public credential :Credential;

  constructor(public http: Http, public imsService: ImsService) {}


  login(credential: Credential): Observable<any> {
    return this.imsService.login(credential);
  }

}
