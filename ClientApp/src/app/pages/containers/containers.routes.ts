import { Route, Routes } from "@angular/router";
import { ContainersComponent } from "./containers/containers.component";
import { ContainerComponent } from "./container/container.component";
import { TerminalComponent } from "./terminal/terminal.component";

export const containersRoutes: Routes = [
  { path: ':env/containers', component: ContainersComponent },
  { path: ':env/containers/:name', component: ContainerComponent },
  { path: ':env/containers/:name/terminal', component: TerminalComponent },
];