import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-git-repository',
  templateUrl: './git-repository.component.html',
  styleUrls: ['./git-repository.component.css']
})
export class GitRepositoryComponent {

  hasAuth: boolean = true;

  gitForm = new FormGroup({
    username: new FormControl('', Validators.required),
    pswd: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
    branch: new FormControl('master', Validators.required),
    composePath: new FormControl('docker-compose.yml', Validators.required),
  });

  constructor() {
  }

  isValid(field: string): boolean {
    const control = this.gitForm.get(field);
    const isError = control?.errors?.['required'] && control?.touched;
    return !isError;
  }

  toggleAuth() {
    this.hasAuth = !this.hasAuth;
  }
    
}
