import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserMenuClaimsDto } from 'src/app/models/Dtos/userMenuClaimsDto';
import { UserService } from 'src/app/services/user.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-user-menu-setting',
  templateUrl: './user-menu-setting.component.html',
  styleUrls: ['./user-menu-setting.component.scss']
})
export class UserMenuSettingComponent {
  userId: string | null | undefined;
  userMenuClaim: UserMenuClaimsDto[] = [];
  dataLoaded = false;
  searchHide = false;
  filterText: '';
  displayedColumns: string[] = ['description', 'status'];
  dataSource: MatTableDataSource<UserMenuClaimsDto> = new MatTableDataSource<UserMenuClaimsDto>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  userMenuForm: FormGroup;


  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.userId = params.get('id');
      }
    );
    this.getAllUserMenuClaim();
  }


  getAllUserMenuClaim() {
    this.userService.getAllUserMenuClaims(this.userId).subscribe(
      (response) => {
        this.userMenuClaim = response.data;
        this.dataSource = new MatTableDataSource<UserMenuClaimsDto>(this.userMenuClaim);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataLoaded = true;

      },
      (responseError) => {
        this.toastrService.error(responseError.data.message, 'Dikkat');
      }
    );
  }

  filterDataSource() {
    this.dataSource.filter = this.filterText.trim().toLocaleLowerCase();
  }

  userMenuStatus(row:any) {
    if (row.status) {
      this.updateUserMenuForm(row.status,row.userMenuClaimId,row.userId,row.menuClaimId);
    this.update();
    }
    else {
      this.updateUserMenuForm(row.status,row.userMenuClaimId,row.userId,row.menuClaimId);
    this.update();
    }
  }

  updateUserMenuForm(status:boolean,userMenuClaimId:number,userId:number,menuClaimId:number) {
    if (status) {
      this.userMenuForm = this.formBuilder.group({
        userMenuClaimId: [userMenuClaimId],
        userId: [userId],
        menuClaimId: [menuClaimId],
        status: [status]
      });
    } else {
      this.userMenuForm = this.formBuilder.group({
        userMenuClaimId: [userMenuClaimId],
        userId: [userId],
        menuClaimId: [menuClaimId],
        status: [status]
      });
    }
  }

  update() {
    if (this.userMenuForm.valid) {
      let userMenuModel = Object.assign({}, this.userMenuForm.value);
      this.userService.updateMenuClaim(userMenuModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          if (responseError.error.ValidationErrors == undefined) {
            this.toastrService.error(responseError.error, 'Dikkat');
          } else {
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
        }
      );
    } else {
      this.toastrService.error('Formunuz Eksik', 'Dikkat');
    }
  }

  exportXlsx() {
    let element = document.getElementById('userMenuTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Kullanıcı Menü Yetkileri');
    XLSX.writeFile(wb, 'Kullanıcı Menü Yetkileri.xlsx');
  }





}
