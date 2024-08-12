import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserridesComponent } from './userrides.component';

describe('UserridesComponent', () => {
  let component: UserridesComponent;
  let fixture: ComponentFixture<UserridesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserridesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserridesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
