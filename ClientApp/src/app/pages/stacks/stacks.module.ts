import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PipesModule } from "src/app/pipes/pipes.module";
import { ContainersModule } from "../containers/containers.module";
import { ImagesModule } from "../images/images.module";
import { NetworksModule } from "../networks/networks.module";
import { VolumesModule } from "../volumes/volumes.module";
import { StackComponent } from "./stack/stack.component";
import { StacksComponent } from "./stacks/stacks.component";
import { TitleModule } from "src/app/components/title/title.module";
import { StackNewComponent } from './stack-new/stack-new.component';
import { ReactiveFormsModule } from "@angular/forms";
import { WebEditorModule } from "src/app/components/web-editor/web-editor.module";
import { UploadModule } from "src/app/components/upload/upload.module";
import { GitRepositoryModule } from "src/app/components/git-repository/git-repository.module";
import { FluidHeightDirective } from "src/app/directives/fluid-height.directive";
import { LoaderComponent } from "../../components/loader/loader.component";

@NgModule({
    declarations: [
        StacksComponent,
        StackComponent,
        StackNewComponent
    ],
    exports: [],
    providers: [],
    bootstrap: [StacksComponent, StackComponent],
    imports: [
        CommonModule,
        TabsModule.forRoot(),
        ReactiveFormsModule,
        PipesModule,
        ImagesModule,
        ContainersModule,
        VolumesModule,
        NetworksModule,
        TitleModule,
        FluidHeightDirective,
        WebEditorModule,
        UploadModule,
        GitRepositoryModule,
        LoaderComponent
    ]
})
export class StacksModule {}