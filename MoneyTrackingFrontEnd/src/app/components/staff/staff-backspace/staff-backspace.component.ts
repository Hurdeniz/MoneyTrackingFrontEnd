import { Component ,Inject} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { StaffService } from 'src/app/services/staff.service';

@Component({
  selector: 'app-staff-backspace',
  templateUrl: './staff-backspace.component.html',
  styleUrls: ['./staff-backspace.component.scss']
})
export class StaffBackspaceComponent {
  staffForm: FormGroup;
  status:boolean=true;
  nameSurname:string;

  constructor(
    private staffService: StaffService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<StaffBackspaceComponent>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.nameSurname=this.data.nameSurname;
 this.createStaffForm();
  }

  createStaffForm() {
    this.staffForm = this.formBuilder.group({
      staffId: [this.data.staffId],
      identityNumber: [this.data.identityNumber],
      nameSurname: [this.data.nameSurname],
      phone1: [this.data.phone1],
      phone2: [this.data.phone2],
      email: [this.data.email],
      province: [this.data.province],
      district: [this.data.district],
      adress: [this.data.adress],
      staffTaskId: [this.data.staffTaskId],
      staffEpisodeId: [this.data.staffEpisodeId],
      dateOfEntryIntoWork: [this.data.dateOfEntryIntoWork],
      dateOfDismissal: [this.data.dateOfDismissal],
      status: [this.status],
    });
  }

  update() {
    debugger
    if (this.staffForm.valid) {
      let staffModel = Object.assign({}, this.staffForm.value);
      this.staffService.update(staffModel).subscribe(
        (response) => {
          this.toastrService.success('Personel Başarıyla Aktifleştirildi', 'Başarılı');
          this.toastrService.info('Personel Bilgilerini Güncelleyin', 'Bilgilendirme');
          this.staffForm.reset();
          this.dialogRef.close('backspace');
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
