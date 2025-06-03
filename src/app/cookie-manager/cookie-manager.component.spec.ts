import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieManagerComponent } from './cookie-manager.component';

describe('CookieManagerComponent', () => {
  let component: CookieManagerComponent;
  let fixture: ComponentFixture<CookieManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookieManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookieManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
