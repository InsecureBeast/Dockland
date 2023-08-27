import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './pages/home/home.component';
import { ContainersModule } from './pages/containers/containers.module';
import { StacksModule } from './pages/stacks/stacks.module';
import { VolumesModule } from './pages/volumes/volumes.module';
import { ImagesModule } from './pages/images/images.module';
import { NetworksModule } from './pages/networks/networks.module';
import { EnvironmentsModule } from './pages/environments/environments.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'test', redirectTo: '/stacks/pilot-saturn-environment?hide=true&env=pilot-saturn'},
      { path: 'cf', redirectTo: '/containers?name=pilot-web-nalivka' }, 
      { path: 'cfh', redirectTo: '/containers?name=pilot-web-nalivka&hide=true&env=pilot-saturn' }, 
      { path: 'cfhp', redirectTo: '/containers?name=e2e-tests-pilot-web&hide=true&env=pilot-moon' }, 
      // {
      //   path: "stacks",
      //   loadChildren: () =>
      //     import('./pages/stacks/stacks.module').then((x) => x.StacksModule),
      // },
    ]),
    ModalModule.forRoot(),
    EnvironmentsModule,
    ContainersModule,
    StacksModule,
    VolumesModule,
    ImagesModule,
    NetworksModule,
    DashboardModule,
    SidebarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
