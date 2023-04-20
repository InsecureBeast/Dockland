import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NetworksComponent } from './networks/networks.component';
import { NetworkComponent } from './network/network.component';
import { NetworkListComponent } from './components/network-list/network-list.component';

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
  ],
  exports: [
    NetworkListComponent
  ]
})
export class NetworksModule { }
