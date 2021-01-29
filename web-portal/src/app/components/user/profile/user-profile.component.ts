import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RxTranslation, translate } from '@rxweb/translate';

declare var gapi: any;
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  @translate({ translationName: 'user' }) multilingualContent: { [key: string]: any; } | any
  User: any;
  Id: any;
  GivenName: any;
  FullName: any;
  FamilyName: any;
  ImageUrl: any;
  Email: any;
  googleUser: any;
  languageCode = localStorage.getItem('locale');

  constructor(private activatedRoute: ActivatedRoute, private router: Router,private rxTranslation: RxTranslation) {
    debugger
    this.Id = localStorage.getItem('Id');
    this.GivenName = localStorage.getItem('GivenName');
    this.FullName = localStorage.getItem('FullName');
    this.FamilyName = localStorage.getItem('FamilyName');
    this.ImageUrl = localStorage.getItem('ImageUrl');
    this.Email = localStorage.getItem('Email');

    // this.activatedRoute.url.subscribe(t => {
    //          this.User = t[0];
    //          console.log(this.User);
    //      })
    //     this.User = this.activatedRoute
    //   .data
    //   .subscribe(v => console.log(v));
    //console.log(this.router.getCurrentNavigation().extras.state);

    //console.log(this.router.getCurrentNavigation());
  }


  ngOnInit() {
   
    // this.Id = this.User.Id;
    // this.GivenName = this.User.GivenName;
    // this.FullName = this.User.FullName;
    // this.FamilyName = this.User.FamilyName;
    // this.ImageUrl = this.User.ImageUrl;
    // this.Email = this.User.Email;

    
    // this.User=localStorage.getItem('user');
    // this.User=JSON.parse(this.User);
    // console.log(JSON.parse(this.User));

    // this.User = history.state.user;
    // console.log(this.User);

    if (this.languageCode == 'en') {
      this.rxTranslation.change(this.languageCode);
    }
    else if (this.languageCode == 'es') {
      this.rxTranslation.change(this.languageCode);
    }
  }
  onLogout(){
    localStorage.clear();
    this.router.navigateByUrl("login");
  }


} 