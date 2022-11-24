import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ShipmentListService } from 'src/app/services/shipment-list.service';
import { ShipmentListViewComponent } from '../../shipment-list/shipment-list-view/shipment-list-view.component';
import { Moment } from 'moment';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-research-list-view',
  templateUrl: './research-list-view.component.html',
  styleUrls: ['./research-list-view.component.scss']
})
export class ResearchListViewComponent implements OnInit {
  shipmentListEditForm:FormGroup;
  dateNow: FormControl;
  dateInput: any;

  constructor(
    private shipmentListService: ShipmentListService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<ShipmentListViewComponent>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.dateNow = new FormControl(
      moment().format('YYYY-MM-DD'),
      Validators.required
    );
    this.dateInput = this.dateNow.value;
this.getForms();
  }

  addEvent(event: any) {
    let date: Moment = event.value;
    this.dateInput = date.format('YYYY-MM-DD');
   this.shipmentListEditForm.controls['date'].setValue(this.dateInput);
  }

  getForms() {
    this.createShipmentListForm();
    this.editShipmentListForm()
  }

  createShipmentListForm(){
    this.shipmentListEditForm = this.formBuilder.group({
      shipmentListId:[this.editData.shipmentListId],
      userId: [this.editData.userId],
      shipmentNumber:[''],
        customerCode:['',Validators.required],
        customerNameSurname:['',Validators.required],
        promissoryNumber:['',Validators.required],
        adress:[this.editData.adress],
        date:[this.dateInput, Validators.required],
        result:[this.editData.result],
        description:[''],
        status: [this.editData.status],
    });


  }



  editShipmentListForm() {
    this.shipmentListEditForm.controls['shipmentNumber'].setValue(this.editData.shipmentNumber);
    this.shipmentListEditForm.controls['customerCode'].setValue(this.editData.customerCode);
    this.shipmentListEditForm.controls['customerNameSurname'].setValue(this.editData.customerNameSurname);
    this.shipmentListEditForm.controls['promissoryNumber'].setValue(this.editData.promissoryNumber);
    this.shipmentListEditForm.controls['description'].setValue(this.editData.description);
  }

  update() {
    if (this.shipmentListEditForm.valid) {
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
