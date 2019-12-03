import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';
import {ToastrModule} from 'ngx-toastr'
import { ModalModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgSelect2Module } from 'ng-select2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import {HttpClientModule} from '@angular/common/http'
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { IntroComponent } from './pages/intro/intro.component';
import { AdminComponent } from './pages/admin/admin.component';
import { InspectListComponent } from './components/inspect-list/inspect-list.component';
import { InspectEditComponent } from './components/inspect-list/inspect-edit/inspect-edit.component';
import { ButtonDeleteComponent } from './components/button-delete/button-delete.component';
import { from } from 'rxjs';
import { AdminNewInspectComponent } from './pages/admin-new-inspect/admin-new-inspect.component';
import { MemberComponent } from './pages/member/member.component';
import { LeaderComponent } from './pages/leader/leader.component';
import { InspectListLeaderComponent } from './components/inspect-list-leader/inspect-list-leader.component';
import { ButtonAddWorkDetailComponent } from './components/button-add-work-detail/button-add-work-detail.component';
import { ViewWorkListComponent } from './components/view-work-list/view-work-list.component';
import { WorkListMemberComponent } from './components/work-list-member/work-list-member.component';
import { SetLevelComponent } from './pages/set-level/set-level.component';
import { MemberListComponent } from './components/member-list/member-list.component';
import { MembersChatWorkComponent } from './components/members-chat-work/members-chat-work.component';
import { MemberChatComponent } from './components/member-chat/member-chat.component';
import { ButtonSetAdminComponent } from './components/button-set-admin/button-set-admin.component';
import { ButtonSetOwnerComponent } from './components/button-set-owner/button-set-owner.component';
import { ButtonSetMemberComponent } from './components/button-set-member/button-set-member.component';
import { ButtonSetBanComponent } from './components/button-set-ban/button-set-ban.component';
import { ButtonSetUnbanComponent } from './components/button-set-unban/button-set-unban.component';
import { InputSearchComponent } from './components/input-search/input-search.component';
import { InputComponent } from './components/input/input.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    IntroComponent,
    AdminComponent,
    InspectListComponent,
    InspectEditComponent,
    ButtonDeleteComponent,
    AdminNewInspectComponent,
    MemberComponent,
    LeaderComponent,
    InspectListLeaderComponent,
    ButtonAddWorkDetailComponent,
    ViewWorkListComponent,
    WorkListMemberComponent,
    SetLevelComponent,
    MemberListComponent,
    MembersChatWorkComponent,
    MemberChatComponent,
    ButtonSetAdminComponent,
    ButtonSetOwnerComponent,
    ButtonSetMemberComponent,
    ButtonSetBanComponent,
    ButtonSetUnbanComponent,
    InputSearchComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      closeButton: true
    }),
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgSelectModule,
    NgSelect2Module,
    ModalModule.forRoot(),
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
