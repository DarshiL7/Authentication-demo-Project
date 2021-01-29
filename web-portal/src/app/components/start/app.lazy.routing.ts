import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { AppModule } from "src/app/app.module";
import { LoginComponent } from "../authenticate/login.component";



const APP_LAZY_ROUTES: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user',
    loadChildren: () => import("src/app/components/user/user.module").then(m => m.UserModule)
  }
  
];


export const APP_LAZY_ROUTING: ModuleWithProviders<AppModule> =
  RouterModule.forRoot(APP_LAZY_ROUTES, { preloadingStrategy: PreloadAllModules });
