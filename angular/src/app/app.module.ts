import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';


//import { MaterialModule, MdDatepickerModule, MdNativeDateModule } from '@angular/material';

import { ModalModule } from 'ngx-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AbpModule } from '@abp/abp.module';

import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';
import { DatePickerInput } from '@shared/components/date-picker-input';

import { HomeComponent } from '@app/home/home.component';
import { AboutComponent } from '@app/about/about.component';
import { UsersComponent } from '@app/users/users.component';
import { CreateUserComponent } from '@app/users/create-user/create-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { RolesComponent } from '@app/roles/roles.component';
import { CreateRoleComponent } from '@app/roles/create-role/create-role.component';
import { EditRoleComponent } from './roles/edit-role/edit-role.component';
import { TenantsComponent } from '@app/tenants/tenants.component';
import { CreateTenantComponent } from './tenants/create-tenant/create-tenant.component';
import { EditTenantComponent } from './tenants/edit-tenant/edit-tenant.component';
import { TopBarComponent } from '@app/layout/topbar.component';
import { TopBarLanguageSwitchComponent } from '@app/layout/topbar-languageswitch.component';
import { SideBarUserAreaComponent } from '@app/layout/sidebar-user-area.component';
import { SideBarNavComponent } from '@app/layout/sidebar-nav.component';
import { SideBarFooterComponent } from '@app/layout/sidebar-footer.component';
import { RightSideBarComponent } from '@app/layout/right-sidebar.component';
import { MaterialInput } from '@shared/directives/material-input.directive';
import { PaginationComponent } from '@shared/pagination/pagination.component';
import { StudentsComponent } from '@app/students/students.component';
import { StudentFormComponent } from '@app/students/student-form/student-form.component';



//		DomainGroupsComponent,
//		DomainGroupFormComponent,
import { DomainsComponent } from '@app/domains/domains.component';
import { DomainFormComponent } from '@app/domains/domain-form/domain-form.component';
//		DomainsComponent,
//		DomainFormComponent,
import { QuestionsComponent } from '@app/questions/questions.component';
import { QuestionFormComponent } from '@app/questions/question-form/question-form.component';
//		QuestionsComponent,
//		QuestionFormComponent,

//		QuestionGroupsComponent,
//		QuestionGroupFormComponent,
import { SurveysComponent } from '@app/surveys/surveys.component';
import { SurveyFormComponent } from '@app/surveys/survey-form/survey-form.component';
//		SurveysComponent,
//		SurveyFormComponent,



import { QuestionAnswerFormComponent } from '@app/question-answers/question-answer-form/question-answer-form.component';
import { QuestionAnswersComponent } from '@app/question-answers/question-answers.component';
import { DomainGroupsComponent } from '@app/domain-groups/domain-groups.component';
import { DomainGroupFormComponent } from '@app/domain-groups/domain-group-form/domain-group-form.component';

import { QuestionGroupsComponent } from '@app/question-groups/question-groups.component';
import { QuestionGroupFormComponent } from '@app/question-groups/question-group-form/question-group-form.component';
//		QuestionGroupsComponent,
//		QuestionGroupFormComponent,


//		TestDatesComponent,
//		TestDateFormComponent,

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
@NgModule({
    declarations: [
        AppComponent,
        PaginationComponent,
        HomeComponent,
        AboutComponent,
        TenantsComponent,
        CreateTenantComponent,
        EditTenantComponent,
        UsersComponent,
        CreateUserComponent,
        EditUserComponent,
        RolesComponent,
        CreateRoleComponent,
        EditRoleComponent,
        TopBarComponent,
        TopBarLanguageSwitchComponent,
        SideBarUserAreaComponent,
        SideBarNavComponent,
        SideBarFooterComponent,
        RightSideBarComponent,
        StudentsComponent,
        StudentFormComponent,
        
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        ModalModule.forRoot(),
        AbpModule,
        AppRoutingModule,
        ServiceProxyModule,
        SharedModule,
        NgxPaginationModule
    ],
    providers: [
        
    ]
})
export class AppModule { }
