import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { ToastrService } from 'ngx-toastr';
import { ShipmentListService } from 'src/app/services/shipment-list.service';

@Component({
  selector: 'app-shipment-list-enter-result',
  templateUrl: './shipment-list-enter-result.component.html',
  styleUrls: ['./shipment-list-enter-result.component.scss']
})
export class ShipmentListEnterResultComponent implements OnInit {
  customerCode:string;
  customerNameSurname:String;
  shipmentListEditForm:FormGroup;

  result: string[] = ['Ok', 'Günlük', 'İptal', 'Diğer'];

  okey=false;
  daily=false;
  cancel=false;
  other=false;




  constructor(
    private shipmentListService: ShipmentListService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public enterResultData: any,
    private dialogRef: MatDialogRef<ShipmentListEnterResultComponent>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.customerCode=this.enterResultData.customerCode;
    this.customerNameSurname=this.enterResultData.customerNameSurname;
    this.createShipmentListForm();
  }


  createShipmentListForm(){
    this.shipmentListEditForm = this.formBuilder.group({
      shipmentListId:[this.enterResultData.shipmentListId],
      userId: [this.enterResultData.userId],
      shipmentNumber:[this.enterResultData.shipmentNumber],
        customerCode:[this.enterResultData.customerCode],
        customerNameSurname:[this.enterResultData.customerNameSurname],
        promissoryNumber:[this.enterResultData.promissoryNumber],
        adress:[this.enterResultData.adress],
        date:[this.enterResultData.date],
        status: ['',Validators.required],
    });


  }

  update() {
    if (this.shipmentListEditForm.valid) {
      debugger
      let shipmentListModel = Object.assign({}, this.shipmentListEditForm.value);
      this.shipmentListService.update(shipmentListModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.shipmentListEditForm.reset();
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
