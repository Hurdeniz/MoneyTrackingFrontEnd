import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup , FormBuilder, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ExpenditureService } from 'src/app/services/expenditure.service';
import { ExpenditureModule } from '../expenditure.module';

@Component({
  selector: 'app-expenditure-view',
  templateUrl: './expenditure-view.component.html',
  styleUrls: ['./expenditure-view.component.scss']
})
export class ExpenditureViewComponent implements OnInit {
  expenditureForm:FormGroup
  actionBtnName = 'Kaydet';
  dialogTitle = 'Masraf Çık';
  isAuthenticated: boolean = false;
  userId: number;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private expenditureService:ExpenditureService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<ExpenditureViewComponent>,
    private toastrService: ToastrService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.refresh
    this.createExpenditureForm();


    if (this.editData) {
      this.editExpenditureForm();
    }

  }

  refresh() {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      let token = localStorage.getItem('token');
      let decode = this.jwtHelper.decodeToken(token);
      let userName = Object.keys(decode).filter((x) => x.endsWith('/name'))[0];
      let userId = Object.keys(decode).filter((x) =>
        x.endsWith('/nameidentifier')
      )[0];
      this.userId = decode[userId];

    }
  }

  createExpenditureForm() {
    if (!this.editData) {
      this.expenditureForm = this.formBuilder.group({
        userId: ['1'],
        amount: ['', Validators.required],
        date:['',Validators.required],
        description: [''],
      });
    } else {
      this.expenditureForm = this.formBuilder.group({
        expenditureId: [this.editData.expenditureId],
        userId: [this.editData.userId],
        amount: ['', Validators.required],
        date: ['',Validators.required],
        description: [''],
      });
    }
  }

  editExpenditureForm() {
    this.actionBtnName = 'Güncelle';
    this.dialogTitle = 'Masraf Güncelle';
    this.expenditureForm.controls['amount'].setValue(this.editData.amount);
    this.expenditureForm.controls['date'].setValue(this.editData.date);
    this.expenditureForm.controls['description'].setValue(this.editData.description);
  }

  add() {

    if (!this.editData) {
      debugger
      if (this.expenditureForm.valid) {
        let expenditureModel = Object.assign({}, this.expenditureForm.value);
        this.expenditureService.add(expenditureModel).subscribe(
          (response) => {

            this.toastrService.success(response.message, 'Başarılı');
            this.expenditureForm.reset();
            this.dialogRef.close('save');
          },
          (responseError) => {
            if (responseError.error.ValidationErrors.length > 0) {
              for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
                this.toastrService.error(
                  responseError.error.ValidationErrors[i].ErrorMessage,
                  'Doğrulama Hatası'
                );
              }
            }
          }
        );
      } else {
        this.toastrService.error('Formunuz Eksik', 'Dikkat');
      }
    } else {
      this.update();
    }
  }

  update() {
    if (this.expenditureForm.valid) {
      let expenditureModel = Object.assign({}, this.expenditureForm.value);
      this.expenditureService.update(expenditureModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.expenditureForm.reset();
          this.dialogRef.close('update');
        },
        (responseError) => {
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
      );
    }
    else {
      this.toastrService.error('Formunuz Eksik', 'Dikkat');
    }
  }


}
