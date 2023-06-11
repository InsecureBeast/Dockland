import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RemoteService } from 'src/app/services/remote.service';
import { IEnvironment } from '../environment';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-environment',
  templateUrl: './environment.component.html',
  styleUrls: ['./environment.component.scss']
})
export class EnvironmentComponent implements OnInit {
  
  private _id: string = crypto.randomUUID();

  buttonTitle: string = "";
  title: string = "";
  environmentForm = new FormGroup({
    envName: new FormControl('', Validators.required),
    envUrl: new FormControl('', Validators.required),
    envTag: new FormControl(''),
  });
  
  constructor(
    private readonly _remoteService: RemoteService, 
    private readonly _router: Router,
    private readonly _route: ActivatedRoute) {

  }

  get envName() { 
    return this.environmentForm.get('envName'); 
  }
  
  get envUrl() { 
    return this.environmentForm.get('envUrl'); 
  }

  get envTag() { 
    return this.environmentForm.get('envTag'); 
  }

  ngOnInit() {
    this._route.params.pipe(first()).subscribe(params => {
      if (!params.name) {
        this.initNew();
        return;
      }

      this.initEdit(params.name);
    });
  }

  isValid(field: string): boolean {
    const control = this.environmentForm.get(field);
    const isError = control?.errors?.['required'] && control?.touched;
    return !isError;
  }

  onSubmit(): void {
    const value = this.environmentForm.value;
    const env = {
      name: value.envName,
      url: value.envUrl,
      tag: value.envTag,
      id: this._id
    }
    this._remoteService.setEnvironment(env as IEnvironment).subscribe(result => {
      if (result === true)
        this._router.navigateByUrl('/');
    });
  }

  private initNew(): void {
    this.buttonTitle = "Create";    
    this.title = "New Environment";
  }

  private initEdit(envId: string): void {
    // TODO loading
    this._remoteService.getEnvironment(envId).subscribe(env => {
      this.buttonTitle = "Update";  
      this.title = `Environment - ${env.name}`;
      this.envName?.setValue(env.name);
      this.envUrl?.setValue(env.url);
      this.envTag?.setValue(env.tag!);
      this._id = envId;
    });
  }
}
