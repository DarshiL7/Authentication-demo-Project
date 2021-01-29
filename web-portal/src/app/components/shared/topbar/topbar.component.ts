import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './topbar.component.html'
})
export class TopBarComponent {
  title = 'web-portal';
  isLoginShow: boolean | undefined;
  constructor(private route: Router) {
    this.route.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (this.route.url.includes("login")||this.route.url.includes("add")) {
          this.isLoginShow=false
        }
        else {
         this.isLoginShow=true
        }
      }
    })
   }

  onLogout() {
    localStorage.clear();
    this.route.navigateByUrl('/login');
  }
  changeLanguage(language: string){
    if(language=="es"){
      localStorage.setItem('locale','es');
      location.reload();
    }
    else{
      localStorage.setItem('locale','en');
      location.reload();
    }
  }

}

