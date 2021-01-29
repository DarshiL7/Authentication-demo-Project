import { Component, Inject, LOCALE_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'web-portal';

  istopbarShow:boolean=false;
  issidebarShow:boolean=false;
  constructor(private router: Router,@Inject(LOCALE_ID) protected localeId: string) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (this.router.url.includes("login")||this.router.url.includes("/user/profile")) {
          this.istopbarShow = false;
          this.issidebarShow=false;
        }
        else {
          this.istopbarShow = true;
          this.issidebarShow=true;
        }
        if(this.router.url.includes("/user/add")){
          this.issidebarShow=false;
        }
      }
    })

  }




}
