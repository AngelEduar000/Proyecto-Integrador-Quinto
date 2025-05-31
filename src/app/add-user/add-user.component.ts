import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { UserService } from '../servicios/user.service';
import { Router } from '@angular/router';
import { FirabaseAuthService } from '../servicios/firabase-auth.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DropdownComponent],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  private router = inject(Router);
  addUserForm: FormGroup;
  private userService: UserService = inject(UserService);

  roles = [
    {
      value: 'administrador',
      label: 'Administrador'
    },
    {
      value: 'ideam',
      label: 'Ideam'
    },
    {
      value: 'investigador',
      label: 'Investigador'
    },
    {
      value: 'cientifico',
      label: 'Científico'
    }
  ]

  constructor(private fb: FormBuilder) {
    this.addUserForm = this.fb.group({
      name: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['user', Validators.required]
    });
  }

  changeSelect(value: any) {
    this.addUserForm.controls['role'].setValue(value);
    this.addUserForm.updateValueAndValidity();
  }

  onSubmit() {
    if (this.addUserForm.valid) {
      const user = {
        isFirstTime: true,
        createOn: new Date(),
        ...this.addUserForm.value,
      }

      this.userService.createUser(user).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/']);
        }
      );
    }
  }
}
