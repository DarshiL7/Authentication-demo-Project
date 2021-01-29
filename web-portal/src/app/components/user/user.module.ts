import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../domain/auth.guard';
import { UserAddComponent } from './add/user-add.component';
import { UserEditComponent } from './edit/user-edit.component';
import { UserViewComponent } from './view/user-view.component';
import { USER_ROUTING } from './user.routing';
import { UserService } from './user.service';
import { UserListComponent } from './list/user-list.component';
import { UserProfileComponent } from './profile/user-profile.component';


@NgModule({
  declarations: [UserAddComponent, UserViewComponent, UserEditComponent,UserListComponent,UserProfileComponent],
  imports: [USER_ROUTING, CommonModule, FormsModule, ReactiveFormsModule
  ],
  exports: [RouterModule],
  providers: [UserService, AuthGuard]
})
export class UserModule { }