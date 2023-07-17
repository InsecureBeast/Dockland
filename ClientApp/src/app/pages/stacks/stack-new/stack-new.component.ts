import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GitRepositoryComponent } from 'src/app/components/git-repository/git-repository.component';
import { EnvironmentService } from 'src/app/services/environment.service';
import { GitOptions, StackCreationOptions } from 'src/app/services/remote-stacks.interface';
import { RemoteService } from 'src/app/services/remote.service';

@Component({
  selector: 'app-stack-new',
  templateUrl: './stack-new.component.html',
  styleUrls: ['./stack-new.component.scss']
})
export class StackNewComponent {

  stackForm = new FormGroup({
    stackName: new FormControl('', Validators.required),
    envUrl: new FormControl('', Validators.required),
    envTag: new FormControl(''),
  });

  @ViewChild(GitRepositoryComponent) gitRepositoryComponent: GitRepositoryComponent | undefined;

  constructor(private readonly _remoteService: RemoteService, private readonly _envService: EnvironmentService) {
  
    
  }

  isValid(field: string): boolean {
    const control = this.stackForm.get(field);
    const isError = control?.errors?.['required'] && control?.touched;
    return !isError;
  }

  onSubmit(): void {
    const value = this.stackForm.value;
    const env = this._envService.currentEnv;
    if (!env)
      return;
    
    const gitValue = this.gitRepositoryComponent?.gitForm.value;
    if (!gitValue)
      return;
    
      const gitOptions: GitOptions = {
        url: <string>gitValue.url,
        branchName: <string>gitValue.branch,
        composeFilename: <string>gitValue.composePath,
      }
      if (this.gitRepositoryComponent?.hasAuth)
      {
        gitOptions.credentials = {
          password: <string>gitValue.pswd,
          userName: <string>gitValue.username
        };
      }

      const options: StackCreationOptions  = {
        gitOptions: gitOptions
      };
    
      this._remoteService.stacks.createNew(env?.name, options).subscribe();
  }
}
