import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ShipmentListService } from 'src/app/services/shipment-list.service';
import { ShipmentListDeleteComponent } from '../../shipment-list/shipment-list-delete/shipment-list-delete.component';

@Component({
  selector: 'app-research-list-delete',
  templateUrl: './research-list-delete.component.html',
  styleUrls: ['./research-list-delete.component.scss']
})
export class ResearchListDeleteComponent implements OnInit {
  customerCode:string;
customerNameSurname:String;

  constructor(
    private shipmentListService: ShipmentListService,
    @Inject(MAT_DIALOG_DATA) public deleteData: any,
    private dialogRef: MatDialogRef<ShipmentListDeleteComponent>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.customerCode=this.deleteData.customerCode;
    this.customerNameSurname=this.deleteData.customerNameSurname;
  }

  delete() {
    this.shipmentListService.delete(this.deleteData).subscribe((response) => {
      this.toastrService.success(response.message, 'Başarılı');
      this.dialogRef.close('delete');
    });
  }

}
