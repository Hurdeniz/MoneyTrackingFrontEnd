import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-password-reset',
  templateUrl: './user-password-reset.component.html',
  styleUrls: ['./user-password-reset.component.scss']
})
export class UserPasswordResetComponent {
  userForm: FormGroup;
  firstName: string;
  lastName: string;


  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UserPasswordResetComponent>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.firstName = this.data.firstName;
    this.lastName = this.data.lastName;
    this.createUserForm();
  }

  createUserForm() {
    this.userForm = this.formBuilder.group({
      userId: [this.data.userId],
      email: [this.data.email],
      firstName: [this.data.email],
      lastName: [this.data.lastName],
      password: ['1'],
    });
  }

  updatePassword() {
    if (this.userForm.valid) {
      let userModel = Object.assign({}, this.userForm.value);
      this.userService.updatePassword(userModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.userForm.reset();
          this.dialogRef.close('updatePassword');
        },
        (responseError) => {
          if (responseError.error.ValidationErrors == undefined) {
            this.toastrService.error(responseError.error, 'Dikkat');
          } else {
            if (responseError.error.ValidationErrors.length > 0) {
              for (
                let i = 0;
                i < responseError.error.ValidationErrors.length;
                i++
              ) {
                this.toastrService.error(
                  responseError.error.ValidationErrors[i].ErrorMessage,
                  'Doğrulama Hatası'
                );
              }
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz Eksik', 'Dikkat');
    }
  }

}
