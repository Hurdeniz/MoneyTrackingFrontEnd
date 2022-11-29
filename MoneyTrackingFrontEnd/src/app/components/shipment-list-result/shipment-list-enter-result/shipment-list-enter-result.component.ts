import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ShipmentListService } from 'src/app/services/shipment-list.service';

@Component({
  selector: 'app-shipment-list-enter-result',
  templateUrl: './shipment-list-enter-result.component.html',
  styleUrls: ['./shipment-list-enter-result.component.scss'],
})
export class ShipmentListEnterResultComponent {
  shipmentListResultForm: FormGroup;
  resultHide = false;
  resultInput = 'Ok';

  constructor(
    private shipmentListService: ShipmentListService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ShipmentListEnterResultComponent>,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createShipmentListForm();
  }

  result(event: any): void {
    if (event.selected == true) {
      const value = event.source.value;
      this.resultInput = value;
      this.createShipmentListForm();
    } else {
      this.resultInput = '';
      this.createShipmentListForm();
    }
  }

  createShipmentListForm() {
    this.shipmentListResultForm = this.formBuilder.group({
      shipmentListId: [this.data.shipmentListId],
      userId: [this.data.userId],
      shipmentNumber: [this.data.shipmentNumber],
      customerCode: [this.data.customerCode],
      customerNameSurname: [this.data.customerNameSurname],
      promissoryNumber: [this.data.promissoryNumber],
      adress: [this.data.adress],
      date: [this.data.date],
      result: [this.resultInput, Validators.required],
      description: [this.data.description],
      status: [this.data.status],
    });
  }

  updateResult() {
    if (this.shipmentListResultForm.valid) {
      let shipmentListModel = Object.assign(
        {},
        this.shipmentListResultForm.value
      );
      this.shipmentListService.update(shipmentListModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.shipmentListResultForm.reset();
          this.dialogRef.close('result');
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
    } else {
      this.toastrService.error('Formunuz Eksik', 'Dikkat');
    }
  }
}
