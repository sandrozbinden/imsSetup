import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { CreateRolePage } from '../pages/create-role/create-role';
import { RoleDetailPage } from '../pages/role-detail/role-detail';
import { CreateFilterPage } from '../pages/create-filter/create-filter';
import { RolesPage } from '../pages/roles/roles';
import { FiltersPage } from '../pages/filters/filters';

import { AuthService } from '../providers/auth-service';
import { ImsService } from '../providers/ims-service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    CreateRolePage,
    RoleDetailPage,
    CreateFilterPage,
    RolesPage, 
    FiltersPage


  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    CreateRolePage,
    RoleDetailPage,
    CreateFilterPage,
    RolesPage,
    FiltersPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    StatusBar,
    SplashScreen,
    AuthService,
    ImsService,
  ]
})
export class AppModule { }

