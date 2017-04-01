import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Group } from '../../model/group';
import { Role } from '../../model/role';
import { AuthService } from '../../providers/auth-service';
import { ImsService } from '../../providers/ims-service';
import { CreateFilterPage } from '../create-filter/create-filter';
/*
  Generated class for the RoleDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-role-detail',
  templateUrl: 'role-detail.html'
})
export class RoleDetailPage {
  public role: Role = new Role();
  constructor(public nav: NavController, public navParams: NavParams, public authService: AuthService, public imsService: ImsService) { }

  ionViewWillEnter() {
    this.loadRole();
  }

  ionViewDidLoad() {
    this.role = this.navParams.get('role');
    this.loadRole();
    console.log(this.role);
  }

  loadRole() {
    this.imsService.getRole(this.authService.credential, this.role).subscribe(
      role => {
        this.role = role;
        this.role.groups.forEach(g => g.checked = true);
        console.log(this.role);
      },
      err => {
        console.log("My error:" + err);
      });;
  }

  createFilter() {
    this.nav.push(CreateFilterPage, {
        role: this.role
    });
  }
}
