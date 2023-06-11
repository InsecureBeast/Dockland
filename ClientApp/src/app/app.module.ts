import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

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

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'test', redirectTo: '/stacks/nalivka-5743?hide=true&env=pilot-saturn'}

      // {
      //   path: "stacks",
      //   loadChildren: () =>
      //     import('./pages/stacks/stacks.module').then((x) => x.StacksModule),
      // },
    ]),
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
