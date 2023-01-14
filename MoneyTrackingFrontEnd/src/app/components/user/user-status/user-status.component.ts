import { Component ,Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.scss']
})
export class UserStatusComponent {
  userForm: FormGroup;
  firstName: string;
  lastName: string;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UserStatusComponent>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.firstName = this.data.row.firstName;
    this.lastName = this.data.row.lastName;
    this.createUserForm();
  }


  createUserForm() {
    this.userForm = this.formBuilder.group({
      userId: [this.data.row.userId],
      email: [this.data.row.email],
      firstName: [this.data.row.firstName],
      lastName: [this.data.row.lastName],
      passwordHash: [this.data.row.passwordHash],
      passwordSalt: [this.data.row.passwordSalt],
      status: [this.data.status]
    });
}

update() {
  if (this.userForm.valid) {
    let userModel = Object.assign({}, this.userForm.value);
    this.userService.update(userModel).subscribe(
      (response) => {
        this.toastrService.success(response.message, 'Başarılı');
        this.userForm.reset();
        this.dialogRef.close('userStatus');
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
