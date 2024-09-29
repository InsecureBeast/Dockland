import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GitRepositoryComponent } from 'src/app/components/git-repository/git-repository.component';
import { WebEditorOptions } from 'src/app/components/web-editor/web-editor.component';
import { EnvironmentService } from '../../environments/environment.service';
import { RemoteStacks, StackCreationOptions } from '../remote-stacks.service';

@Component({
  selector: 'app-stack-new',
  templateUrl: './stack-new.component.html',
  styleUrls: ['./stack-new.component.scss']
})
export class StackNewComponent implements OnInit{

  private _composeCode: string = "";

  isComposeEditorEmpty: boolean = true;

  stackForm = new FormGroup({
    stackName: new FormControl("", [ Validators.required, Validators.pattern("^[a-z0-9_-]*$")] ),
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
    private readonly _remoteService: RemoteStacks, 
    private readonly _envService: EnvironmentService,
    private readonly _changeDetector: ChangeDetectorRef) {
  }
  ngOnInit(): void {
    const env = this._envService.currentEnv;
    if (!env)
      return;

    this._remoteService.get(env.name, "test").subscribe(data => {
      console.log(data);
    });
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

  composeCodeChanged(code: string) {
    this._composeCode = code;
  }

  onSubmit(): void {
    const env = this._envService.currentEnv;
    if (!env)
      return;
    
    const value = this.stackForm.value;
    const options: StackCreationOptions = {
      params: this.environmentsCode.split("\n"),
      stackName: value.stackName as string,
      editor: this._composeCode
    }
    this._remoteService.set(env.name, options).subscribe();
      // const gitValue = this.gitRepositoryComponent?.gitForm.value;
    // if (!gitValue)
    //   return;
    
    // const gitOptions: GitOptions = {
    //   url: <string>gitValue.url,
    //   branchName: <string>gitValue.branch,
    //   composeFilename: <string>gitValue.composePath,
    // }
    // if (this.gitRepositoryComponent?.hasAuth)
    // {
    //   gitOptions.credentials = {
    //     password: <string>gitValue.pswd,
    //     userName: <string>gitValue.username
    //   };
    // }

    // const options: StackCreationOptions  = {
    //   gitOptions: gitOptions
    // };
  
    // this._remoteService.stacks.set(env?.name, options).subscribe();
  }
}
