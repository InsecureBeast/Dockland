import { Routes } from "@angular/router";
import { StackNewComponent } from "./stack-new/stack-new.component";
import { StacksComponent } from "./stacks/stacks.component";
import { StackComponent } from "./stack/stack.component";

export const stacksRoutes: Routes = [
  { matcher: (url) => {
    if (url.length === 2 && url[1].path === "new") {
        return { consumed: url };
    }
    return null;
  }, component: StackNewComponent },
  { path: '', component: StacksComponent },
  { path: 'stacks/:name', component: StackComponent },
  { path: 'stacks/new', component: StackNewComponent },
];
