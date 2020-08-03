import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import {Subject} from 'rxjs/Subject';


import {HttpModule} from "@angular/http";
import { NgxSpinnerModule } from 'ngx-spinner';
import * as moment from 'moment';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';




import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import {AuthService} from "./services/auth.service";
import {BlogService} from "./services/blog.service";
import {TodoService} from "./services/todo.service";
import {AuthGuard} from "./services/auth-guard.service";
import {DataService} from "./services/data.service";
import {AdminAuthGuard} from "./services/admin-auth-guard.service";




import { HttpClientModule } from '@angular/common/http';
import {Routes,RouterModule} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { BlogsPageComponent } from './blogs-page/blogs-page.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { TodosComponent } from './todos/todos.component';
import { TodoComponent } from './todo/todo.component';
import { MyTodoComponent } from './my-todo/my-todo.component';
import { MyBlogComponent } from './my-blog/my-blog.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { ErrorComponent } from './error/error.component';







const AppRoutes:Routes=[

{
  path:"",
  component:HomeComponent,
 
},

{
  path:"blogs/:id",
  component:MyBlogComponent,
 
  
},

{
  path:"blogs",
  component:BlogsPageComponent,
  canActivate:[AuthGuard,AdminAuthGuard]
  
},

{
  path:"todos/:id",
  component:MyTodoComponent
},

{
  path:"blog/:id/:slug",
  component:BlogPageComponent
 
},

{
  path:"register",
  component:RegisterComponent
},
{
  path:"login",
  component:LoginComponent
},


{
  path:"todos",
  component:TodosComponent,
    canActivate:[AuthGuard,AdminAuthGuard]
},


{
  path:"todo",
  component:TodoComponent
},
{
  path:"mytodo",
  component:MyTodoComponent,
  canActivate:[AuthGuard]
},
{
  path:"myblog",
  component:MyBlogComponent,
  canActivate:[AuthGuard]
},
{

  path:"no-access",
  component:NoAccessComponent
},

{

  path:"**",
  component:NoAccessComponent
},



];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    BlogsPageComponent,
    BlogPageComponent,
    TodosComponent,
    TodoComponent,
    MyTodoComponent,
    MyBlogComponent,
    NoAccessComponent,
    ErrorComponent,
    
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
     NgxSpinnerModule,
     CustomFormsModule,
    
  
    HttpModule,
    RouterModule.forRoot(AppRoutes),
    NgbModule.forRoot(),
    ScrollToModule.forRoot()
  ],
  providers: [AuthService,BlogService,TodoService,AuthGuard,DataService,AdminAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
