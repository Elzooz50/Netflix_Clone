import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  // Calling backend Api but not real
  constructor () {}
  login(email:String, password:String) {
    localStorage.setItem("token", Math.random()+"");
  }
  get ngOnInit() {
    if (localStorage.getItem("token")) { // user is registerd
      return true;
    }
    return false;
  }
}
