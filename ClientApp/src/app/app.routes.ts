import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { DashboardComponent } from "./pages/dashboard/dashboard/dashboard.component";
import { ContainersComponent } from "./pages/containers/containers/containers.component";
import { ImagesComponent } from "./pages/images/images/images.component";
import { containersRoutes } from "./pages/containers/containers.routes";
import { NetworksComponent } from "./pages/networks/networks/networks.component";
import { StacksComponent } from "./pages/stacks/stacks/stacks.component";
import { stacksRoutes } from "./pages/stacks/stacks.routes";
import { VolumesComponent } from "./pages/volumes/volumes/volumes.component";
import { EnvironmentsComponent } from "./pages/environments/environments/environments.component";

export const appRouts: Routes = [
  { path: '*', redirectTo: 'environments' }, 
  { path: 'environments', component: HomeComponent, 
    children: [
      { path: '', component: EnvironmentsComponent}
    ] 
  }, 
  { path: 'environments/:env', component: HomeComponent , 
    children: [
      { path: '', component: DashboardComponent},
      { path: 'containers', component: ContainersComponent },
      ...containersRoutes,
      { path: 'images', component: ImagesComponent },
      { path: 'networks', component: NetworksComponent },
      { path: 'stacks', component: StacksComponent },
      ...stacksRoutes,
      { path: 'volumes', component: VolumesComponent }
    ]
  },
  { path: 'test', redirectTo: 'environments/pilot-saturn/stacks/pilot-saturn-environment?hide=true&env=pilot-saturn' },
  { path: 'cf', redirectTo: 'environments/pilot-saturn/containers?name=pilot-web-nalivka' },
  { path: 'cfh', redirectTo: 'environments/pilot-saturn/containers?name=pilot-web-nalivka&hide=true&env=pilot-saturn' },
  { path: 'cfhp', redirectTo: 'environments/pilot-moon/containers?name=e2e-tests-pilot-web&hide=true&env=pilot-moon' },
];