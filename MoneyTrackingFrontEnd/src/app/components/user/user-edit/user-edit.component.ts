import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent {
  userForm: FormGroup;
  actionBtnName: string='Güncelle';
  dialogTitle: string='Kullanıcı Güncelle';

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UserEditComponent>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createUserForm();
    this.editUserForm();

  }

  createUserForm() {
      this.userForm = this.formBuilder.group({
        userId: [this.data.userId],
        email: ['', Validators.email],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        passwordHash: [this.data.passwordHash],
        passwordSalt: [this.data.passwordSalt],
        status: [this.data.status]
      });
  }

  editUserForm() {
    this.userForm.controls['email'].setValue(
      this.data.email
    );
    this.userForm.controls['firstName'].setValue(this.data.firstName);
    this.userForm.controls['lastName'].setValue(this.data.lastName);
  }

  update() {
    if (this.userForm.valid) {
      let userModel = Object.assign({}, this.userForm.value);
      this.userService.update(userModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.userForm.reset();
          this.dialogRef.close('update');
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
