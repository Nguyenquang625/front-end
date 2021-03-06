import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './pages/login/login.component'
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { IntroComponent } from './pages/intro/intro.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminNewInspectComponent } from './pages/admin-new-inspect/admin-new-inspect.component';
import { MemberComponent } from './pages/member/member.component';
import { LeaderComponent } from './pages/leader/leader.component';
import { SetLevelComponent } from './pages/set-level/set-level.component';
import { MemberChatComponent } from './components/member-chat/member-chat.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { AddUserLeaderComponent } from './pages/add-user-leader/add-user-leader.component';

const routes: Routes = [
  {
    path: '',
    pathMatch:"full", //Dan css,js
    redirectTo:"intro"
  },
  {
    path: 'intro', component: IntroComponent,
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'home', component: HomeComponent,
  },
  {
    path: 'admin', component: AdminComponent,
  },
  {
    path: 'admin-new-inspect', component: AdminNewInspectComponent,
  },
  {
    path: 'admin-set-level', component: SetLevelComponent,
  },
  {
    path: 'admin-add-user', component: AddUserComponent,
  },
  {
    path: 'leader', component: LeaderComponent,
  },
  {
    path: 'add-user-leader', component: AddUserLeaderComponent,
  },
  {
    path: 'member', component: MemberComponent,
  },
  {
    path: 'member-chat', component: MemberChatComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
