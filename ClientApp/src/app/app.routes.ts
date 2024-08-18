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
      { path: '', component: EnvironmentsComponent},
      { path: ':env/dashboard', component: DashboardComponent, },
      { path: ':env/containers', component: ContainersComponent },
      ...containersRoutes,
      { path: ':env/images', component: ImagesComponent },
      { path: ':env/networks', component: NetworksComponent },
      { path: ':env/stacks', component: StacksComponent },
      ...stacksRoutes,
      { path: ':env/volumes', component: VolumesComponent }
    ]
  },
  { path: 'test', redirectTo: 'environments/pilot-saturn/stacks/pilot-saturn-environment?hide=true' },
  { path: 'cf', redirectTo: 'environments/pilot-saturn/containers?name=pilot-web-nalivka' },
  { path: 'cfh', redirectTo: 'environments/pilot-saturn/containers?name=pilot-web-nalivka&hide=true' },
  { path: 'cfhp', redirectTo: 'environments/pilot-moon/containers?name=e2e-tests-pilot-web&hide=true' },
];