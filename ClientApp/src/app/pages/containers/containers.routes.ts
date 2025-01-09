import { Routes } from "@angular/router";
import { ContainersComponent } from "./containers/containers.component";
import { ContainerComponent } from "./container/container.component";
import { TerminalComponent } from "./terminal/terminal.component";

export const containersRoutes: Routes = [
  { path: ':env/containers', component: ContainersComponent },
  { path: ':env/containers/:id', component: ContainerComponent },
  { path: ':env/containers/:id/terminal', component: TerminalComponent },
];