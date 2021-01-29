import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RxTranslation, translate } from "@rxweb/translate";
import { User } from "../user.model";
import { UserService } from "../user.service";


@Component({
    selector: "app-user-view",
    templateUrl: './user-view.component.html'
})

export class UserViewComponent implements OnInit {
    @translate({translationName:'user'}) multilingualContent:{ [key: string]: any; } | any
    userFormGroup: FormGroup = this.formBuilder.group({});
    submitted = false;
    Id=localStorage.getItem('id') ;
    userRecord: any;
    languageCode = localStorage.getItem('locale');
    constructor(private router: Router, private userService: UserService, private formBuilder: FormBuilder,
        private rxTranslation: RxTranslation,
        private activatedRoute: ActivatedRoute) {

        // this.activatedRoute.params.subscribe(t => {
        //     this.Id = t['Id'];
        // })
        
    }

    ngOnInit(): void {
        this.userFormGroup = this.formBuilder.group({
            Id:[0],
            firstname:[''],
            lastname:[''],
            username:[''],
            password:['']
        });
        this.setDefaultValues();
        if(this.languageCode=='en'){
            this.rxTranslation.change(this.languageCode);
        }
        else if(this.languageCode=='es'){
            this.rxTranslation.change(this.languageCode);
        }
    }

    setDefaultValues() {    
        
        this.userService.getBy(this.Id).subscribe(res => {
            
            this.userRecord = res
            this.userFormGroup.controls.Id.setValue(localStorage.getItem('id'))
            this.userFormGroup.controls.firstname.setValue(this.userRecord.firstName)
            this.userFormGroup.controls.lastname.setValue(this.userRecord.lastName)
            this.userFormGroup.controls.username.setValue(this.userRecord.username)
            this.userFormGroup.controls.password.setValue(this.userRecord.password)
            
        })

    }

    edit(){
        this.router.navigateByUrl("/user/edit/"+this.Id);
    }

    delete(){
        
            
                this.userService.delete(this.Id).subscribe(x=>{
                    localStorage.clear();
                    this.router.navigateByUrl('/login');
                })

                
               
    }
 
}   