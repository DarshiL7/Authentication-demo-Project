import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router";
import { RxTranslation, translate } from "@rxweb/translate";
import { User } from "../user.model";
import { UserService } from "../user.service";


@Component({
    selector: "app-user-list",
    templateUrl: './user-list.component.html'
})

export class UserListComponent implements OnInit {
    @translate({translationName:'user'}) multilingualContent:{ [key: string]: any; } | any
    users: any[] = [];
    constructor(private route: Router, private userService: UserService,private rxTranslation: RxTranslation) { }
    id: number = 1;
    languageCode = localStorage.getItem('locale');
    //deleteUser=false;
    ngOnInit(): void {
        this.userService.get().subscribe(res => {
            this.users = res;
        });
        if(this.languageCode=='en'){
            this.rxTranslation.change(this.languageCode);
        }
        else if(this.languageCode=='es'){
            this.rxTranslation.change(this.languageCode);
        }
    }
    navigateToPage(page: string, user: User) {
        
        console.log(user.id);
            if (page == "edit") {
                this.route.navigateByUrl('/user/edit/' + user.id);
                
            }
            if (page == "delete") {
                this.route.navigateByUrl('/user/delete/' + user.id);
            }
        

    }
    delete(user: User) {
        //this.deleteUser=true;
        this.userService.getBy(user.id).subscribe(response => {
            this.id = response.id;
            this.userService.delete(this.id).subscribe(t => {
                
                this.route.navigateByUrl('/user/list');
                this.ngOnInit()
            })
        })

    }
    

   

    
}
