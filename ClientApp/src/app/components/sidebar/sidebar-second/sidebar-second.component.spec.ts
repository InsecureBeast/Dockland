import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarSecondComponent } from './sidebar-second.component';

describe('SidebarTreeComponent', () => {
  let component: SidebarSecondComponent;
  let fixture: ComponentFixture<SidebarSecondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarSecondComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
