import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './pages/home/home.component';
import { CounterComponent } from './pages/counter/counter.component';
import { ImagesComponent } from './pages/images/images.component';
import { FormatFileSizePipe } from './pipes/format-file-size.pipe';
import { ContainersModule } from './pages/containers/containers.module';
import { ContainersComponent } from './pages/containers/containers.component';
import { StacksModule } from './pages/stacks/stacks.module';
import { VolumesModule } from './pages/volumes/volumes.module';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    ImagesComponent,
    FormatFileSizePipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'images', component: ImagesComponent },
      { path: 'containers', component: ContainersComponent },
      // {
      //   path: "stacks",
      //   loadChildren: () =>
      //     import('./pages/stacks/stacks.module').then((x) => x.StacksModule),
      // },
    ]),
    ContainersModule,
    StacksModule,
    VolumesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
