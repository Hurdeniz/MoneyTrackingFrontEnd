import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent {
  userForm: FormGroup;
  actionBtnName: string;
  dialogTitle: string;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UserViewComponent>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.data.status) {

      this.actionBtnName = 'Kaydet';
      this.dialogTitle = 'Kullanıcı Ekle';
    } else if (!this.data.status) {
      this.actionBtnName = 'Güncelle';
      this.dialogTitle = 'Kullanıcı Güncelle';
    }
    this.getForms();
  }

  getForms() {
    this.createUserForm();
    if (!this.data.status) {
      this.editUserForm();
    }
  }

  createUserForm() {
    if (this.data.status) {
      this.userForm = this.formBuilder.group({
        email: ['', Validators.email],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        password: ['1111']
      });
    } else if (!this.data.status) {
      this.userForm = this.formBuilder.group({
        userId: [this.data.row.userId],
        email: ['', Validators.email],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        passwordHash: [this.data.row.passwordHash],
        passwordSalt: [this.data.row.passwordSalt],
        status: [this.data.row.status]
      });
    }
  }
  editUserForm() {
    this.userForm.controls['email'].setValue(
      this.data.row.email
    );
    this.userForm.controls['firstName'].setValue(this.data.row.firstName);
    this.userForm.controls['lastName'].setValue(this.data.row.lastName);
  }

  statusControl() {
    if (this.data.status) {
      this.add();
    } else if (!this.data.status) {
      this.update();
    }
  }

  add() {
    debugger
    if (this.userForm.valid) {
      let userModel = Object.assign({}, this.userForm.value);
      this.userService.add(userModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.userForm.reset();
          this.dialogRef.close('save');
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
