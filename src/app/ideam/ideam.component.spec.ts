import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeamComponent } from './ideam.component';

describe('IdeamComponent', () => {
  let component: IdeamComponent;
  let fixture: ComponentFixture<IdeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdeamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
