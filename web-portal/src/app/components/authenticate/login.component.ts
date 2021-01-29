import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RxTranslateModule, RxTranslation, translate } from '@rxweb/translate';


import { AuthenticationService } from './login.service';
declare var gapi: any;
@Component({
  selector: 'selector-name',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup = this.formBuilder.group({});
  submitted = false;
  returnUrl = "user/view";
  isAlertShow: boolean = false;
  error: any;
  Id:string="";
  GivenName:string="";
  user: {
    [key: string]: any;
  } = {'Id':0, 'GivenName':"",'FullName':"",'FamilyName':"",'ImageUrl':"",'Email':""}
  
  googleUser: any;
  show: boolean = false;
  loading: boolean = false;
  @translate({ translationName: 'login' }) multilingualContent: { [key: string]: any; } | any
  FullName: string="";
  FamilyName: string="";
  ImageUrl: string="";
  Email: string="";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    public translate: RxTranslateModule,
    private rxTranslation: RxTranslation
  ) { }

  ngOnInit() {
    this.btnRender();
    this.loginFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }
  login() {
    
    this.submitted = true;
    if (this.loginFormGroup.invalid) {
      return;
    }


    this.authenticationService.login(this.loginFormGroup.controls.username.value, this.loginFormGroup.controls.password.value)
      .subscribe(
        responce => {

          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.isAlertShow = true

        });
  }
  signup() {
    this.router.navigateByUrl("/user/add");
  }
  showPassword() {
    this.show = !this.show;
  }
  close() {
    this.loginFormGroup.reset();
  }
  changeLanguage(languageCode: string) {
    //RxTranslateModule.changeLanguage(languageCode)
    this.rxTranslation.change(languageCode);
    //localStorage.setItem('locale',languageCode);
  }

  public btnRender(): void {

    const options = {
      scope: 'profile email',
      width: 250,
      height: 50,
      longtitle: true,
      theme: 'dark',
      onsuccess: ((googleUser: any) => {

        let profile = googleUser.getBasicProfile();
        this.Id = profile.getId();
        this.GivenName = profile.getGivenName();
        this.FullName = profile.getName();
        this.FamilyName = profile.getFamilyName();
        this.ImageUrl = profile.getImageUrl();
        this.Email= profile.getEmail();

       // this.router.navigateByUrl("/user/profile",{ state: { user:this.user } });
       
        localStorage.setItem('token', googleUser.getAuthResponse().id_token);
        localStorage.setItem('Id',this.Id);
        localStorage.setItem('GivenName',this.GivenName);
        localStorage.setItem('FullName',this.FullName);
        localStorage.setItem('FamilyName',this.FamilyName);
        localStorage.setItem('ImageUrl',this.ImageUrl);
        localStorage.setItem('Email',this.Email);
        this.router.navigateByUrl("/user/profile", {​​ state: {​​ user: this.user }​​ }​​);
       // localStorage.setItem('user',JSON.stringify(this.user));
      }),
      onfailure: ((error: any) => {
        console.log('failure', error);
      })
    };
    gapi.signin2.render('googleBtn', options);
  }

} 