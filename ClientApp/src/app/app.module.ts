import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ContainersModule } from './pages/containers/containers.module';
import { StacksModule } from './pages/stacks/stacks.module';
import { VolumesModule } from './pages/volumes/volumes.module';
import { ImagesModule } from './pages/images/images.module';
import { NetworksModule } from './pages/networks/networks.module';
import { EnvironmentsModule } from './pages/environments/environments.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { SidebarModule } from './components/sidebar/sidebar-main/sidebar-main.module';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { SidebarSecondModule } from './components/sidebar/sidebar-second/sidebar-second.module';
import { HomeModule } from './pages/home/home.module';
import { appRouts } from './app.routes';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        ConfirmationDialogComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot(appRouts),
        ModalModule.forRoot(),
        EnvironmentsModule,
        ContainersModule,
        StacksModule,
        VolumesModule,
        ImagesModule,
        NetworksModule,
        DashboardModule,
        SidebarModule,
        SidebarSecondModule,
        HomeModule
    ]
})
export class AppModule { }
