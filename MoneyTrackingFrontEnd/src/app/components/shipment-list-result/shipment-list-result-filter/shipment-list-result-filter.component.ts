import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-shipment-list-result-filter',
  templateUrl: './shipment-list-result-filter.component.html',
  styleUrls: ['./shipment-list-result-filter.component.scss']
})
export class ShipmentListResultFilterComponent {
  dateForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ShipmentListResultFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public dateData: any,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.showDate();
  }

  showDate() {
    this.dateForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  dialogClose() {
    this.dialogRef.close(this.dateForm.value);
  }

}
