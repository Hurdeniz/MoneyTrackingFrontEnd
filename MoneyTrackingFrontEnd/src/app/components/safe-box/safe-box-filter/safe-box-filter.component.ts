import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-safe-box-filter',
  templateUrl: './safe-box-filter.component.html',
  styleUrls: ['./safe-box-filter.component.scss']
})
export class SafeBoxFilterComponent {
  dateForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<SafeBoxFilterComponent>,
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
