import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBrigadistasComponent } from './add-edit-brigadistas.component';

describe('AddEditBrigadistasComponent', () => {
  let component: AddEditBrigadistasComponent;
  let fixture: ComponentFixture<AddEditBrigadistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditBrigadistasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditBrigadistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
