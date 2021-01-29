import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../domain/auth.guard';
import { UserAddComponent } from './add/user-add.component';
import { UserEditComponent } from './edit/user-edit.component';
import { UserViewComponent } from './view/user-view.component';
import { UserModule } from './user.module';
import { UserListComponent } from './list/user-list.component';
import { UserProfileComponent } from './profile/user-profile.component';


const USER_ROUTES: Routes = [
	{
		path: 'view',
		component: UserViewComponent
		, canActivate: [AuthGuard]
	},
	{
		path:'list',
		component:UserListComponent
		, canActivate:[AuthGuard]
	},
	{
		path: 'add',
		component: UserAddComponent
		//, canActivate: [AuthGuard]
	},
	{
		path: 'edit/:id',
		component: UserEditComponent
		, canActivate: [AuthGuard]
	},
	{
		path:'profile',
		component: UserProfileComponent,
		data : {user : ''}
	}
];

export const USER_ROUTING: ModuleWithProviders<UserModule> = RouterModule.forChild(USER_ROUTES);
