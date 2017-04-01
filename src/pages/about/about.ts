import { Component } from '@angular/core';
import { AuthService } from '../../providers/auth-service';
import { ImsService } from '../../providers/ims-service';
import { NavController } from 'ionic-angular';
import { Role } from '../../model/role';
import { HomePage } from '../home/home';
import { CreateRolePage } from '../create-role/create-role';
import { RoleDetailPage } from '../role-detail/role-detail';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  public roles: Role[];

  constructor(public nav: NavController, public authService: AuthService, public imsService: ImsService) {

  }

  ionViewWillEnter() {
    this.loadRoles();
  }

  public loadRoles() {
    this.imsService.getRoles(this.authService.credential).subscribe(
      roles => {
        this.roles = roles.roles;
        console.log(this.roles)
      },
      err => {
        console.log("My error:" + err);
      });;
  }

  public viewRoleDetail(role: Role): void {
    this.nav.push(RoleDetailPage, {
      role: role
    });
  }

  public removeRole(role: Role): void {
    this.imsService.deleteRole(this.authService.credential, role).subscribe(
      response => {
        console.log(response)
        this.loadRoles();
      },
      err => {
        console.log("My error:" + err);
      });;
  }

  public createRole(): void {
    this.nav.push(CreateRolePage);
  }

}
