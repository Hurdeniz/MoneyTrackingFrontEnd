import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ShipmentListService } from 'src/app/services/shipment-list.service';
import { ShipmentListViewComponent } from '../../shipment-list/shipment-list-view/shipment-list-view.component';

@Component({
  selector: 'app-research-list-view',
  templateUrl: './research-list-view.component.html',
  styleUrls: ['./research-list-view.component.scss']
})
export class ResearchListViewComponent implements OnInit {
  shipmentListEditForm:FormGroup;

  constructor(
    private shipmentListService: ShipmentListService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<ShipmentListViewComponent>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createShipmentListForm();
    this.editShipmentListForm()
  }

  createShipmentListForm(){
    this.shipmentListEditForm = this.formBuilder.group({
      shipmentListId:[this.editData.shipmentListId],
      userId: [this.editData.userId],
      shipmentNumber:[''],
        customerCode:[''],
        customerNameSurname:[''],
        promissoryNumber:[''],
        date:[''],
        status: [''],
    });


  }


  editShipmentListForm() {
    this.shipmentListEditForm.controls['date'].setValue(this.editData.date);
    this.shipmentListEditForm.controls['shipmentNumber'].setValue(this.editData.shipmentNumber);
    this.shipmentListEditForm.controls['customerCode'].setValue(this.editData.customerCode);
    this.shipmentListEditForm.controls['customerNameSurname'].setValue(this.editData.customerNameSurname);
    this.shipmentListEditForm.controls['promissoryNumber'].setValue(this.editData.promissoryNumber);
    this.shipmentListEditForm.controls['status'].setValue(this.editData.status);
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
