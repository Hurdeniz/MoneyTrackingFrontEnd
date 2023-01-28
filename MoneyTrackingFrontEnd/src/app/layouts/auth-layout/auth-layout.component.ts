import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})


export class AuthLayoutComponent implements OnInit {
  users: User[] = [];
  status: boolean = true;
  hide = true;
  loginForm: FormGroup;


  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
    this.getAllUserByStatus();
  }

  getAllUserByStatus() {
    this.userService.getAllUserByStatus(this.status).subscribe(
      (response) => {
        this.users = response.data;
      },
      (responseError) => {
        this.toastrService.error(responseError.data.message, 'Dikkat');
      }
    );
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }


  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe((response) => {
        this.toastrService.success('Sisteme Giriş Başarılı', 'Hoş Geldiniz');

        if (this.authService.redirectUrl) {
          this.router.navigate([this.authService.redirectUrl]);
        } else {
          this.router.navigate(['']);
        }
        localStorage.setItem('token', response.data.token);
      },
        (responseError) => {
          this.toastrService.error(responseError.error, 'Giriş Başarısız')
        });

    } else {
    }
  }

}
