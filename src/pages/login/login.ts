import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Credential} from '../../model/credential';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import { TabsPage } from '../tabs/tabs';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  private credentialForm : FormGroup;
  public storageKey: string = "LoginPage.credential";


  constructor(public nav: NavController,public navParams: NavParams,public authService: AuthService, private formBuilder: FormBuilder) {
      this.credentialForm = this.formBuilder.group({ username: ['admin'], password: ['admin'], server: ['https://sinv-56028.edu.hsr.ch'] });
  }
  

  login() {
    let server = this.credentialForm.value['server'];
    let username = this.credentialForm.value['username'];
    let password = this.credentialForm.value['password'];
    let credential = new Credential(server, username, password);
    this.authService.login(credential).subscribe(
      success => {
        this.authService.credential = credential;
        this.nav.setRoot(TabsPage);
      },
      err => {
        console.log("My error:" + err);
      });;
  }
}
