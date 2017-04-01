import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { ImsService } from '../../providers/ims-service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Groups } from '../../model/groups'
import { Group } from '../../model/group'
import { Role } from '../../model/role'

/*
  Generated class for the CreateRole page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-role',
  templateUrl: 'create-role.html'
})
export class CreateRolePage {

  public groups: Group[];
  private selectedGroups: Set<number> = new Set<number>();
  public roleForm: FormGroup;

  constructor(public nav: NavController, public navParams: NavParams, public authService: AuthService, public imsService: ImsService, private formBuilder: FormBuilder) {
    this.roleForm = this.formBuilder.group({ name: ['', Validators.compose([Validators.required])] });
    this.imsService.getGroups(authService.credential).subscribe(
      groups => {
        this.groups = groups.groups;
        console.log(this.groups);
      },
      err => {
        console.log("My error:" + err);
      });;
  }

  updateSelectedGroup(id: number) {
    if (this.selectedGroups.has(id)) {
      this.selectedGroups.delete(id);
    } else {
      this.selectedGroups.add(id);
    }
  }


  createRole() {
    if (this.roleForm.valid) {
      let name = this.roleForm.value['name'];
      this.selectedGroups.forEach(id => console.log("id:" + id));
      console.log("Name:" + name + " Groups:" + this.selectedGroups.values);
      let role = new Role();
      role.name = name;
      role.groups = Array.from(this.selectedGroups).map(id => new Group(id));
      this.imsService.createRole(this.authService.credential, role).subscribe(
        response => {
          console.log(response);
          this.nav.pop();
        },
        err => {
          console.log("My error:" + err);
        });;

    }
  }
}
