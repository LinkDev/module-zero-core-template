import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RolesComponent } from "app/roles/roles.component";

import { StudentsComponent } from '@app/students/students.component';
//{ path: 'students', component: StudentsComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
//import { DomainGroupsComponent } from '@app/domain-groups/domain-groups.component';
//{ path: 'domaingroups', component: DomainGroupsComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
//import { DomainsComponent } from '@app/domains/domains.component';
//{ path: 'domains', component: DomainsComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
//import { QuestionAnswersComponent } from '@app/question-answers/question-answers.component';
///{ path: 'questionanswers', component: QuestionAnswersComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
//import { QuestionsComponent } from '@app/questions/questions.component';
//{ path: 'questions', component: QuestionsComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
//import { QuestionGroupsComponent } from '@app/question-groups/question-groups.component';
//{ path: 'questiongroups', component: QuestionGroupsComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
//import { SurveysComponent } from '@app/surveys/surveys.component';
//{ path: 'surveys', component: SurveysComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },

//import { TestDatesComponent } from '@app/test-dates/test-dates.component';
//{ path: 'testdates', component: TestDatesComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    { path: 'home', component: HomeComponent, canActivate: [AppRouteGuard] },
                    { path: 'users', component: UsersComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    { path: 'roles', component: RolesComponent, data: { permission: 'Pages.Roles' }, canActivate: [AppRouteGuard] },
                    { path: 'tenants', component: TenantsComponent, data: { permission: 'Pages.Tenants' }, canActivate: [AppRouteGuard] },
                    { path: 'students', component: StudentsComponent, data: { permission: 'Pages.Tenants' }, canActivate: [AppRouteGuard] },
                    { path: 'about', component: AboutComponent },
                    
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }