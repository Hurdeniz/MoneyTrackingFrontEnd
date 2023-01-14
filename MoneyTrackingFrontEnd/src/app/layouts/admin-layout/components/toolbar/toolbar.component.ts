import { Component, OnInit ,Output,EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output() public sidenavToggle=new EventEmitter();
  isAuthenticated: boolean;
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private router :Router
  ) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  public onToggleSidenav=()=>{
    this.sidenavToggle.emit();

  }

  logout(){
    localStorage.removeItem('token');
    this.toastrService.info('Çıkış Yaptınız','Başarılı');
    this.router.navigate(['/login']);
    this.isAuthenticated=false;

  }

}
