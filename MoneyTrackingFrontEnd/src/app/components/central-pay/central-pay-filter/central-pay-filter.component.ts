import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-central-pay-filter',
  templateUrl: './central-pay-filter.component.html',
  styleUrls: ['./central-pay-filter.component.scss']
})
export class CentralPayFilterComponent implements OnInit {
  dateForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CentralPayFilterComponent>,
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
