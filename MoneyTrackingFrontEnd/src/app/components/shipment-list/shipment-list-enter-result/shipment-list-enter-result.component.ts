import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  disabled = false;
  disabled1 = false;
  disabled2 = false;
  disabled3 = false;
  constructor(
    private shipmentListService: ShipmentListService,
    @Inject(MAT_DIALOG_DATA) public enterResultData: any,
    private dialogRef: MatDialogRef<ShipmentListEnterResultComponent>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.customerCode=this.enterResultData.customerCode;
    this.customerNameSurname=this.enterResultData.customerNameSurname;
  }

}
