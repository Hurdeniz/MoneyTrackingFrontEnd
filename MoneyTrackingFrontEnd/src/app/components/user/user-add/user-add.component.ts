import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

interface Authorization {
  id: number;
  authorizationValue: string;
}

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent {
  userForm: FormGroup;
  actionBtnName: string = 'Kaydet';
  dialogTitle: string = 'Kullanıcı Ekle'
  authorizationId = new FormControl('', Validators.required);
  authorizations: Authorization[] = [
    { id: 1, authorizationValue: 'Kasa Şefi' },
    { id: 2, authorizationValue: 'Kasa Personeli' },
    { id: 3, authorizationValue: 'Müşteri Hizmetleri' },
    { id: 4, authorizationValue: 'Yetki Yok' },
  ];

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UserAddComponent>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createUserForm();
  }

  createUserForm() {
      this.userForm = this.formBuilder.group({
        operationClaimId: [''],
        menuClaimId: [''],
        email: ['', Validators.email],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        password: ['', Validators.required]
      });
  }

  addAuthorization(){
    this.userForm.controls['operationClaimId'].setValue(this.authorizationId.value);
    this.userForm.controls['menuClaimId'].setValue(this.authorizationId.value);
    this.add();
  }

  add() {
    if (this.userForm.valid) {
      let userModel = Object.assign({}, this.userForm.value);
      this.userService.add(userModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.userForm.reset();
          this.dialogRef.close('save');
        },
        (responseError) => {
          console.log(responseError)
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
