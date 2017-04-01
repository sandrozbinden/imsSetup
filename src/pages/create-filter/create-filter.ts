import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { ImsService } from '../../providers/ims-service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Models } from '../../model/models'
import { Filter } from '../../model/filter'
import { Role } from '../../model/role'
/*
  Generated class for the CreateFilter page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-filter',
  templateUrl: 'create-filter.html'
})
export class CreateFilterPage {

  public filterForm: FormGroup;
  public models: Models = new Models();
  public role: Role = new Role();
  public roles: Role[] = [];


  constructor(public nav: NavController, public navParams: NavParams, public authService: AuthService, public imsService: ImsService, private formBuilder: FormBuilder) {
    this.filterForm = this.formBuilder.group({ name: ['', Validators.compose([Validators.required])], archive: [], role: [] });
    this.imsService.getModels(authService.credential).subscribe(
      models => {
        this.models = models;
        console.log(this.models);
      },
      err => {
        console.log("My error:" + err);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateFilterPage');
    this.role = this.navParams.get('role');
    this.imsService.getRoles(this.authService.credential).subscribe(
      roles => {
        this.roles = roles.roles;
        console.log(this.roles);
      },
      err => {
        console.log("My error:" + err);
      });
  }

  isRoleSelected(role): boolean {
    console.log(this.role.id + "==="  + role.id);
    return this.role.id === role.id;
  }


  createFilter() {
    if (this.filterForm.valid) {
      let name = this.filterForm.value['name'];
      let archiveName = this.filterForm.value['archive'];
      let filterRole = new Role();
      filterRole.id = this.role.id;
      filterRole.groups = undefined;
      filterRole.filters = undefined;
      console.log("Name: " + name + " archiveName: " + archiveName);
      let filter = new Filter();
      filter.name = name;
      filter.roles = [filterRole];
      filter.archiveName = archiveName;
      this.imsService.createFilter(this.authService.credential, filter).subscribe(
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
