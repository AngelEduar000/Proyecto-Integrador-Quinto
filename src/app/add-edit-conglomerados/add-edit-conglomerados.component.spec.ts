import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditConglomeradosComponent } from './add-edit-conglomerados.component';

describe('AddEditConglomeradosComponent', () => {
  let component: AddEditConglomeradosComponent;
  let fixture: ComponentFixture<AddEditConglomeradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditConglomeradosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditConglomeradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
