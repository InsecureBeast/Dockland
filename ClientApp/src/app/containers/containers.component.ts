import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Container } from './container';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.scss']
})
export class ContainersComponent {

  public containers: Container[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Container[]>(baseUrl + 'containers').subscribe({ 
      next: (result) => { this.containers = result.map(i => {
        return i;
      });
      },
      error: (e) => console.error(e)
    });
  }

}
