import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { GitRepositoryComponent } from 'src/app/components/git-repository/git-repository.component';
import { WebEditorOptions } from 'src/app/components/web-editor/web-editor.component';
import { EnvironmentService } from 'src/app/services/environment.service';
import { GitOptions, StackCreationOptions } from 'src/app/services/remote-stacks.interface';
import { RemoteService } from 'src/app/services/remote.service';


@Component({
  selector: 'app-stack-new',
  templateUrl: './stack-new.component.html',
  styleUrls: ['./stack-new.component.scss']
})
export class StackNewComponent {

  isComposeEditorEmpty: boolean = true;

  stackForm = new FormGroup({
    stackName: new FormControl(null, [ Validators.required, Validators.pattern("^[a-z0-9_-]*$")] ),
  });

  evironmentsEditorOptions: WebEditorOptions = {
    codeLens: false,
    language: "shell",
    lineNumbersMinChars: 3

  };
  composeEditorOptions: WebEditorOptions = {
    codeLens: true,
    language: "yaml"
  };

  composeCode: string = '';
  environmentsCode: string = "";

  @ViewChild(GitRepositoryComponent) gitRepositoryComponent: GitRepositoryComponent | undefined;

  constructor(
    private readonly _remoteService: RemoteService, 
    private readonly _envService: EnvironmentService,
    private readonly _changeDetector: ChangeDetectorRef) {
  }

  isValid(field: string): boolean {
    return !this.isEmpty(field) && !this.isPattern(field);
  }

  isEmpty(field: string): boolean {
    const control = this.stackForm.get(field);
    const isError = control?.hasError("required") && control?.touched;
    return !!isError;
  }

  isPattern(field: string): boolean {
    const control = this.stackForm.get(field);
    const isError = control?.hasError("pattern") && (control.dirty || control.touched);
    return !!isError;
  }

  setIsComposeEditroEmpty(value: boolean): void {
    this.isComposeEditorEmpty = value;
    this._changeDetector.detectChanges();
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

  private noWhitespaceValidator(control: FormControl):  ValidationErrors | null {
    let text = control.value as string;
    return (text || '').includes(' ')? { 'whitespace': true } : null;       
  }
}
