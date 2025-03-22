import { Component, inject, input } from '@angular/core';
import { BG_IMG_URL, LOGO_URL } from '../../constants/config';
import { FormsModule } from '@angular/forms';
import { style } from '@angular/animations';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  logoUrl = LOGO_URL;
  bgUrl = BG_IMG_URL;

  email!:string;// Not Null
  password!:string;

  loginService = inject(LoginService);
  router = inject(Router); // redirct user after login
  toasterService = inject(ToastrService);

  ngOnInit() {
    if (this.loginService.ngOnInit) {// user logged in  before
      this.router.navigate(["/browse"]);
    }
  }
  onSubmit() {
    if (!this.email || !this.password) {
      this.toasterService.error("Provide email or password");
      return
    }
    else if(!this.email.includes("@")) {
      this.toasterService.error("Email must contain @");
      return
    }
    else if(Number(this.password) < 8) {
      this.toasterService.error("Password must contain at least 8 chars");
      return
    }
    this.loginService.login(this.email, this.password);// Look like saving credential in local storage
    this.toasterService.success("logged in sucessfully.");
    this.router.navigate(["/browse"]);// redirct user after login
  }
}
