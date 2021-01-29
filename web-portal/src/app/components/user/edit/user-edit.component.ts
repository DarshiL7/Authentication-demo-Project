import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RxTranslation, translate } from "@rxweb/translate";
import { UserService } from "../user.service";


@Component({
    selector: "app-user-edit",
    templateUrl: './user-edit.component.html'
})

export class UserEditComponent implements OnInit {
    @translate({translationName:'user'}) multilingualContent:{ [key: string]: any; } | any
    userFormGroup: FormGroup = this.formBuilder.group({});
    submitted = false;
    id:number=0;
    isAlertShow:boolean=false;
    userRecord: any;
    languageCode = localStorage.getItem('locale');
    constructor(private router: Router, private userService: UserService, private formBuilder: FormBuilder,
        private rxTranslation: RxTranslation,
        private activatedRoute: ActivatedRoute) {
       
        this.activatedRoute.params.subscribe(t => {
            this.id = t['id'];
        })
    }

    ngOnInit(): void {
        this.userFormGroup = this.formBuilder.group({
            Id:[0],
            firstname:['',Validators.required],
            lastname:['',Validators.required],
            username:['',Validators.required],
            password:['',Validators.required]
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
        this.userService.getBy(this.id).subscribe(res => {
 
            this.userRecord = res
            this.userFormGroup.controls.Id.setValue(this.userRecord.id)
            this.userFormGroup.controls.firstname.setValue(this.userRecord.firstName)
            this.userFormGroup.controls.lastname.setValue(this.userRecord.lastName)
            this.userFormGroup.controls.username.setValue(this.userRecord.username)
            this.userFormGroup.controls.password.setValue(this.userRecord.password)
            
        })
    }

    edit() {

        this.submitted = true;
        if (this.userFormGroup.valid) {

            var user = this.userFormGroup.value;

                
                this.userService.put(this.userRecord.id, user).subscribe(t => {

                   
                    this.isAlertShow=true;
                    
                    
                })
             }

    }
 
    close(){
        localStorage.clear();
        this.router.navigateByUrl("/login");
    }
}
