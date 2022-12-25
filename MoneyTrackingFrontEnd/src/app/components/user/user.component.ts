import { Component } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UserOperationsSettingComponent } from './user-operations-setting/user-operations-setting.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );


  constructor(private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog) {}



  openUserOperationSettingDialog() {
    this.dialog
      .open(UserOperationsSettingComponent, {
        width: '1000px',
        height:'600px'
      })
      .afterClosed()
      .subscribe((value) => {
        if (value == undefined) {

        } else {

        }
      });
  }



}
