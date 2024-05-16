import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NetworksComponent } from './networks/networks.component';
import { NetworkComponent } from './network/network.component';
import { NetworkListComponent } from './components/network-list/network-list.component';
import { TitleModule } from 'src/app/components/title/title.module';
import { FluidHeightDirective } from 'src/app/directives/fluid-height.directive';
import { LoaderComponent } from "../../components/loader/loader.component";

@NgModule({
    declarations: [
        NetworksComponent,
        NetworkComponent,
        NetworkListComponent
    ],
    exports: [
        NetworkListComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forRoot([
            { path: 'networks', component: NetworksComponent },
            { path: 'networks/:name', component: NetworkComponent },
        ]),
        TitleModule,
        FluidHeightDirective,
        LoaderComponent
    ]
})
export class NetworksModule { }
