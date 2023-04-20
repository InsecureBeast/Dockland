import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './pages/home/home.component';
import { CounterComponent } from './pages/counter/counter.component';
import { ContainersModule } from './pages/containers/containers.module';
import { StacksModule } from './pages/stacks/stacks.module';
import { VolumesModule } from './pages/volumes/volumes.module';
import { ImagesModule } from './pages/images/images.module';
import { NetworksModule } from './pages/networks/networks.module';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      // {
      //   path: "stacks",
      //   loadChildren: () =>
      //     import('./pages/stacks/stacks.module').then((x) => x.StacksModule),
      // },
    ]),
    ContainersModule,
    StacksModule,
    VolumesModule,
    ImagesModule,
    NetworksModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
