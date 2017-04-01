import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RolesPage } from '../roles/roles';
import { FiltersPage } from '../filters/filters';
import { LoginPage } from '../login/login';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = RolesPage;
  tab3Root: any = FiltersPage;

  constructor(public nav: NavController) {

  }

  public logout() {
    this.nav.setRoot(LoginPage);
  }

}
