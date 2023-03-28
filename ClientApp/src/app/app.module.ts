import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { ImagesComponent } from './images/images.component';
import { FormatFileSizePipe } from './pipes/format-file-size.pipe';
import { ContainersModule } from './containers/containers.module';
import { ContainersComponent } from './containers/containers.component';

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
    ]),
    ContainersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
