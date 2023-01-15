import { DOCUMENT } from '@angular/common';
import { Component, OnInit ,Output,EventEmitter, Inject} from '@angular/core';
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
  screenStatus:boolean=false;
  element: any;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router :Router
  ) { }

  ngOnInit(): void {
    this.element = document.documentElement;
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

  fullScreenStatus(){
    console.log(this.screenStatus);

  }


  openFullscreen() {
    if (this.element.requestFullscreen) {
      this.element.requestFullscreen();
    } else if (this.element.mozRequestFullScreen) {
      /* Firefox */
      this.element.mozRequestFullScreen();
    } else if (this.element.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.element.webkitRequestFullscreen();
    } else if (this.element.msRequestFullscreen) {
      /* IE/Edge */
      this.element.msRequestFullscreen();
    }
  }

  /* Close fullscreen */
  closeFullscreen() {
    if (document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }

}
