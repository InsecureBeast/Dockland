import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RemoteService } from 'src/app/services/remote.service';
import { IEnvironment } from '../environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-environment',
  templateUrl: './environment.component.html',
  styleUrls: ['./environment.component.css']
})
export class EnvironmentComponent {
  buttonTitle: string;
  title: string;

  environmentForm = new FormGroup({
    envName: new FormControl('', Validators.required),
    envUrl: new FormControl('', Validators.required),
    envTag: new FormControl(''),
  });

  constructor(private readonly _remoteService: RemoteService, private readonly _router: Router) {
    this.buttonTitle = "Create";    
    this.title = "New Environment";
  }

  get envName() { return this.environmentForm.get('envName'); }
  get envUrl() { return this.environmentForm.get('envUrl'); }

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
      tag: value.envTag
    }
    this._remoteService.setEnvironment(env as IEnvironment).subscribe(result => {
      if (result === true)
        this._router.navigateByUrl('/');
    });
  }
}
