import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-money-output-filter',
  templateUrl: './money-output-filter.component.html',
  styleUrls: ['./money-output-filter.component.scss']
})
export class MoneyOutputFilterComponent {
  dateForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<MoneyOutputFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public dateData: any,
    private formBuilder: FormBuilder
  ) {}

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
