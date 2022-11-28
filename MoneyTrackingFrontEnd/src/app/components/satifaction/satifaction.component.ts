import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SatisfactionFilterComponent } from './satisfaction-filter/satisfaction-filter.component';
import { SatisfactionViewComponent } from './satisfaction-view/satisfaction-view.component';
import { SatisfactionDeleteComponent } from './satisfaction-delete/satisfaction-delete.component';
import { SatisfactionService } from 'src/app/services/satisfaction.service';
import { ToastrService } from 'ngx-toastr';
import { Satisfaction } from 'src/app/models/satisfaction';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatInput } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { Moment } from 'moment';
import * as XLSX from 'xlsx';
import * as _moment from 'moment';

const moment = _moment;

@Component({
  selector: 'app-satifaction',
  templateUrl: './satifaction.component.html',
  styleUrls: ['./satifaction.component.scss'],
})
export class SatifactionComponent implements OnInit {
  satisfanction: Satisfaction[] = [];
  satisfactionForm: FormGroup;
  myControl = new FormControl('');
  displayedColumns: string[] = [
    'date',
    'customerCode',
    'customerNameSurname',
    'promissoryNumber',
    'phone',
    'result',
    'action',
  ];
  dataSource: MatTableDataSource<Satisfaction> =
    new MatTableDataSource<Satisfaction>();
  dataLoaded = false;
  searchHide = false;
  filterText: '';
  dateNow: FormControl;
  dateInput: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('customerCode') nameInput: MatInput;
  startDate = moment().format('YYYY-MM-DD');
  endDate = moment().format('YYYY-MM-DD');
  options: string[] = ['Sorun Yok', 'Ulaşılamıyor', 'Değişim İstiyor','Açmamış','Cevap Yok', 'İptal İstiyor','Numara Yanlış','Meşgule Atıyor'];

  constructor(
    private satisfactionService: SatisfactionService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.dateNow = new FormControl(
      moment().format('YYYY-MM-DD'),
      Validators.required
    );
    this.dateInput = this.dateNow.value;

    this.getAllSatisfactionDetailByDate();
    this.createSatisfactionForm();
  }
  filterDataSource() {
    this.dataSource.filter = this.filterText.trim().toLocaleLowerCase();
  }

  addEvent(event: any) {
    let date: Moment = event.value;
    this.dateInput = date.format('YYYY-MM-DD');
    this.startDate = date.format('YYYY-MM-DD');
    this.endDate = date.format('YYYY-MM-DD');
    this.satisfactionForm.controls['date'].setValue(this.dateInput);
    this.getAllSatisfactionDetailByDate();
  }

  getAllSatisfactionDetailByDate() {
    this.satisfactionService
      .getAllSatisfactionDetailByDate(this.startDate, this.endDate)
      .subscribe(
        (response) => {
          this.satisfanction = response.data;
          this.dataSource = new MatTableDataSource<Satisfaction>(
            this.satisfanction
          );
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataLoaded = true;
        },
        (responseError) => {
          this.toastrService.error(responseError.data.message, 'Dikkat');
        }
      );
  }

  createSatisfactionForm() {
    this.satisfactionForm = this.formBuilder.group({
      customerCode: ['', Validators.required],
      customerNameSurname: ['', Validators.required],
      promissoryNumber: ['', Validators.required],
      phone: ['', Validators.required],
      date: [this.dateInput, Validators.required],
      result: ['', Validators.required],
    });
  }

  add() {
    if (this.satisfactionForm.valid) {
      let satisfactionModel = Object.assign({}, this.satisfactionForm.value);
      this.satisfactionService.add(satisfactionModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.satisfactionForm.reset();
          this.nameInput.focus();
          this.createSatisfactionForm();
          this.getAllSatisfactionDetailByDate();
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

  openFilterDialog() {
    this.dialog
      .open(SatisfactionFilterComponent, {
        width: '25%',
      })
      .afterClosed()
      .subscribe((value) => {
        if (value == undefined) {
          this.getAllSatisfactionDetailByDate();
        } else {
          this.startDate = value.startDate.format('YYYY-MM-DD');
          this.endDate = value.endDate.format('YYYY-MM-DD');
          this.getAllSatisfactionDetailByDate();
        }
      });
  }

  openEditDialog(row: any) {
    this.dialog
      .open(SatisfactionViewComponent, {
        width: '25%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getAllSatisfactionDetailByDate();
        }
      });
  }

  openDeleteDialog(row: any) {
    this.dialog
      .open(SatisfactionDeleteComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'delete') {
          this.getAllSatisfactionDetailByDate();
        }
      });
  }

  exportXlsx() {
    let element = document.getElementById('satisfactionTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Memnuniyet Listesi');
    XLSX.writeFile(wb, 'Memnuniyet Listesi.xlsx');
  }
}
