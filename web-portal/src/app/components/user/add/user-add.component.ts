import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { RxTranslation, translate } from "@rxweb/translate";

import { UserService } from "../user.service";

@Component({
    selector: "app-user-add",
    templateUrl: './user-add.component.html'
})

export class UserAddComponent implements OnInit{
    @translate({translationName:'user'}) multilingualContent:{ [key: string]: any; } | any
    userFormGroup:FormGroup = this.formBuilder.group({});
    submitted = false;
    alertShow=false;
    isSuccessShow=false;
    languageCode = localStorage.getItem('locale');
    constructor(private route: Router, private userService: UserService, private formBuilder: FormBuilder,private rxTranslation: RxTranslation) {
    }

    ngOnInit(): void {

        this.userFormGroup = this.formBuilder.group({
            firstname:['',Validators.required],
            lastname:['',Validators.required],
            username:['',Validators.required],
            password:['',Validators.required]
        })

        if(this.languageCode=='en'){
            this.rxTranslation.change(this.languageCode);
        }
        else if(this.languageCode=='es'){
            this.rxTranslation.change(this.languageCode);
        }
    }

    add(){
        this.submitted=true;
        if(this.userFormGroup.valid){

            this.userService.post(this.userFormGroup.value).subscribe(
                t=>{this.isSuccessShow=true;
                    
        },
        error=>{
            this.alertShow=true;
        })  
        }
    }
    loginPage(){
        this.route.navigateByUrl("/login");
        localStorage.clear();
    }
    close(){
        this.userFormGroup.reset();
    }
    closeLogin(){
        this.route.navigateByUrl("/login");
        localStorage.clear();
    }

    

}