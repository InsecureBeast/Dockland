import { Route, Routes } from "@angular/router";
import { ContainersComponent } from "./containers/containers.component";
import { ContainerComponent } from "./container/container.component";
import { TerminalComponent } from "./terminal/terminal.component";

export const containersRoutes: Routes = [
  { path: 'containers', component: ContainersComponent },
  { path: 'containers/:name', component: ContainerComponent },
  { path: 'containers/:name/terminal', component: TerminalComponent },
];