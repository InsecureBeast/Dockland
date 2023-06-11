import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NetworksComponent } from './networks/networks.component';
import { NetworkComponent } from './network/network.component';
import { NetworkListComponent } from './components/network-list/network-list.component';
import { TitleModule } from 'src/app/components/title/title.module';

@NgModule({
  declarations: [
    NetworksComponent,
    NetworkComponent,
    NetworkListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: 'networks', component: NetworksComponent },
      { path: 'networks/:name', component: NetworkComponent },
    ]),
    TitleModule
  ],
  exports: [
    NetworkListComponent
  ]
})
export class NetworksModule { }
