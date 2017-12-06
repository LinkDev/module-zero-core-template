import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

import { AnnouncementsComponent } from '@app/announcements/announcements.component';
import { DomainsComponent } from '@app/domains/domains.component';
import { DomainGroupsComponent } from '@app/domain-groups/domain-groups.component';
import { DomainGroupSubCategoriesComponent } from '@app/domain-group-sub-categories/domain-group-sub-categories.component';
import { DomainGroupCategoriesComponent } from '@app/domain-group-categories/domain-group-categories.component';
import { ApplicationCategoriesComponent } from '@app/application-categories/application-categories.component';
import { ApplicationsComponent } from '@app/applications/applications.component';
import { PhasesComponent } from '@app/phases/phases.component';
import { ApprovalRequestsComponent } from '@app/approval-requests/approval-requests.component';
import { ApprovalStepsComponent } from '@app/approval-steps/approval-steps.component';
import { ApprovalRequestStepsComponent } from '@app/approval-request-steps/approval-request-steps.component';
import { AssetTypesComponent } from '@app/asset-types/asset-types.component';
import { CallBackResponsesComponent } from '@app/call-back-responses/call-back-responses.component';
import { SurveysComponent } from '@app/surveys/surveys.component';
import { SamplesComponent } from '@app/samples/samples.component';
import { CommentsComponent } from '@app/comments/comments.component';
import { ResponsesComponent } from '@app/responses/responses.component';
import { QuestionsComponent } from '@app/questions/questions.component';
import { QuestionGroupsComponent } from '@app/question-groups/question-groups.component';
import { DomainSettingsComponent } from '@app/domain-settings/domain-settings.component';
import { DomainTrainingCentersComponent } from '@app/domain-training-centers/domain-training-centers.component';
import { TrainingCentersComponent } from '@app/training-centers/training-centers.component';
import { EncodingMapperQuestionsComponent } from '@app/encoding-mapper-questions/encoding-mapper-questions.component';
import { EncodingResponsesComponent } from '@app/encoding-responses/encoding-responses.component';
import { ExamResultsComponent } from '@app/exam-results/exam-results.component';
import { InspectionsComponent } from '@app/inspections/inspections.component';
import { LocationTrackingsComponent } from '@app/location-trackings/location-trackings.component';
import { LogActionTypesComponent } from '@app/log-action-types/log-action-types.component';
import { LogsComponent } from '@app/logs/logs.component';
import { OnlineRegistrationResponsesComponent } from '@app/online-registration-responses/online-registration-responses.component';
import { PhaseQuestionsComponent } from '@app/phase-questions/phase-questions.component';
import { PhaseSurveysComponent } from '@app/phase-surveys/phase-surveys.component';
import { QualityCallBackResponseAnswersComponent } from '@app/quality-call-back-response-answers/quality-call-back-response-answers.component';
import { QualityCallBackResponsesComponent } from '@app/quality-call-back-responses/quality-call-back-responses.component';
import { QuestionAnswersComponent } from '@app/question-answers/question-answers.component';
import { QuestionAttachmentsComponent } from '@app/question-attachments/question-attachments.component';
import { QuestionnaireExamResultsComponent } from '@app/questionnaire-exam-results/questionnaire-exam-results.component';
import { QuestionnairesComponent } from '@app/questionnaires/questionnaires.component';
import { QuestionnaireQuestionAnswersComponent } from '@app/questionnaire-question-answers/questionnaire-question-answers.component';
import { QuestionnaireQuestionsComponent } from '@app/questionnaire-questions/questionnaire-questions.component';
import { QuestionnaireQuestionAttachmentsComponent } from '@app/questionnaire-question-attachments/questionnaire-question-attachments.component';
import { QuestionTemplateAnswersComponent } from '@app/question-template-answers/question-template-answers.component';
import { QuestionTemplatesComponent } from '@app/question-templates/question-templates.component';
import { QuestionTemplateSubCategoriesComponent } from '@app/question-template-sub-categories/question-template-sub-categories.component';
import { QuestionTemplateCategoriesComponent } from '@app/question-template-categories/question-template-categories.component';
import { QuestionTemplateValidationRulesComponent } from '@app/question-template-validation-rules/question-template-validation-rules.component';
import { RandomizedRegularDataComponent } from '@app/randomized-regular-data/randomized-regular-data.component';
import { RandomizedRegularDataByDomainsComponent } from '@app/randomized-regular-data-by-domains/randomized-regular-data-by-domains.component';
import { RegicesComponent } from '@app/regices/regices.component';
import { RegExCategoriesComponent } from '@app/reg-ex-categories/reg-ex-categories.component';
import { ReportTypesComponent } from '@app/report-types/report-types.component';
import { ResponseSubStatusesComponent } from '@app/response-sub-statuses/response-sub-statuses.component';
import { SimilarityDataByCallCentersComponent } from '@app/similarity-data-by-call-centers/similarity-data-by-call-centers.component';
import { SimilarityDataByQualitiesComponent } from '@app/similarity-data-by-qualities/similarity-data-by-qualities.component';
import { SimilarityPercentagesComponent } from '@app/similarity-percentages/similarity-percentages.component';
import { SyncLogsComponent } from '@app/sync-logs/sync-logs.component';
import { TempFilteredResponsesComponent } from '@app/temp-filtered-responses/temp-filtered-responses.component';
import { TrainingAttendancesComponent } from '@app/training-attendances/training-attendances.component';
import { TrainingMembersComponent } from '@app/training-members/training-members.component';
import { TrainingProgramsComponent } from '@app/training-programs/training-programs.component';
import { TrainingCenterUsersComponent } from '@app/training-center-users/training-center-users.component';
import { TrainingExamsComponent } from '@app/training-exams/training-exams.component';
import { TrainingProgramDocumentsComponent } from '@app/training-program-documents/training-program-documents.component';
import { TrainingResultsComponent } from '@app/training-results/training-results.component';
import { UploadedReportRolesComponent } from '@app/uploaded-report-roles/uploaded-report-roles.component';
import { UploadedReportsComponent } from '@app/uploaded-reports/uploaded-reports.component';
import { UserApplicationsComponent } from '@app/user-applications/user-applications.component';
import { UserDomainsComponent } from '@app/user-domains/user-domains.component';
import { UserLocationByDomainsComponent } from '@app/user-location-by-domains/user-location-by-domains.component';
import { UserLocationByDomainsHistoriesComponent } from '@app/user-location-by-domains-histories/user-location-by-domains-histories.component';
import { UserProfilesComponent } from '@app/user-profiles/user-profiles.component';
import { UserProfilesProgressesComponent } from '@app/user-profiles-progresses/user-profiles-progresses.component';
import { UsersActiveDomainsComponent } from '@app/users-active-domains/users-active-domains.component';
import { UsersAssignmentsComponent } from '@app/users-assignments/users-assignments.component';
import { UserSurveysTemplatesComponent } from '@app/user-surveys-templates/user-surveys-templates.component';
import { ValidationRulesComponent } from '@app/validation-rules/validation-rules.component';
import { ViolatedValidationRulesComponent } from '@app/violated-validation-rules/violated-validation-rules.component';
import { WorkingDataByUsersComponent } from '@app/working-data-by-users/working-data-by-users.component';
@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
					{ path: 'workingdatabyusers', component: WorkingDataByUsersComponent},

					{ path: 'violatedvalidationrules', component: ViolatedValidationRulesComponent},

					{ path: 'validationrules', component: ValidationRulesComponent},

					{ path: 'usersurveystemplates', component: UserSurveysTemplatesComponent},

					{ path: 'usersassignments', component: UsersAssignmentsComponent},

					{ path: 'usersactivedomains', component: UsersActiveDomainsComponent},

					{ path: 'userprofilesprogresses', component: UserProfilesProgressesComponent},

					{ path: 'userprofiles', component: UserProfilesComponent},

					{ path: 'userlocationbydomainshistories', component: UserLocationByDomainsHistoriesComponent},

					{ path: 'userlocationbydomains', component: UserLocationByDomainsComponent},

					{ path: 'userdomains', component: UserDomainsComponent},

					{ path: 'userapplications', component: UserApplicationsComponent},

					{ path: 'uploadedreports', component: UploadedReportsComponent},

					{ path: 'uploadedreportroles', component: UploadedReportRolesComponent},

					{ path: 'trainingresults', component: TrainingResultsComponent},

					{ path: 'trainingprogramdocuments', component: TrainingProgramDocumentsComponent},

					{ path: 'trainingexams', component: TrainingExamsComponent},

					{ path: 'trainingcenterusers', component: TrainingCenterUsersComponent},

					{ path: 'trainingprograms', component: TrainingProgramsComponent},

					{ path: 'trainingmembers', component: TrainingMembersComponent},

					{ path: 'trainingattendances', component: TrainingAttendancesComponent},

					{ path: 'tempfilteredresponses', component: TempFilteredResponsesComponent},

					{ path: 'synclogs', component: SyncLogsComponent},

					{ path: 'similaritypercentages', component: SimilarityPercentagesComponent},

					{ path: 'similaritydatabyqualities', component: SimilarityDataByQualitiesComponent},

					{ path: 'similaritydatabycallcenters', component: SimilarityDataByCallCentersComponent},

					{ path: 'responsesubstatuses', component: ResponseSubStatusesComponent},

					{ path: 'reporttypes', component: ReportTypesComponent},

					{ path: 'regexcategories', component: RegExCategoriesComponent},

					{ path: 'regices', component: RegicesComponent},

					{ path: 'randomizedregulardatabydomains', component: RandomizedRegularDataByDomainsComponent},

					{ path: 'randomizedregulardata', component: RandomizedRegularDataComponent},

					{ path: 'questiontemplatevalidationrules', component: QuestionTemplateValidationRulesComponent},

					{ path: 'questiontemplatecategories', component: QuestionTemplateCategoriesComponent},

					{ path: 'questiontemplatesubcategories', component: QuestionTemplateSubCategoriesComponent},

					{ path: 'questiontemplates', component: QuestionTemplatesComponent},

					{ path: 'questiontemplateanswers', component: QuestionTemplateAnswersComponent},

					{ path: 'questionnairequestionattachments', component: QuestionnaireQuestionAttachmentsComponent},

					{ path: 'questionnairequestions', component: QuestionnaireQuestionsComponent},

					{ path: 'questionnairequestionanswers', component: QuestionnaireQuestionAnswersComponent},

					{ path: 'questionnaires', component: QuestionnairesComponent},

					{ path: 'questionnaireexamresults', component: QuestionnaireExamResultsComponent},

					{ path: 'questionattachments', component: QuestionAttachmentsComponent},

					{ path: 'questionanswers', component: QuestionAnswersComponent},

					{ path: 'qualitycallbackresponses', component: QualityCallBackResponsesComponent},

					{ path: 'qualitycallbackresponseanswers', component: QualityCallBackResponseAnswersComponent},

					{ path: 'phasesurveys', component: PhaseSurveysComponent},

					{ path: 'phasequestions', component: PhaseQuestionsComponent},

					{ path: 'onlineregistrationresponses', component: OnlineRegistrationResponsesComponent},

					{ path: 'logs', component: LogsComponent},

					{ path: 'logactiontypes', component: LogActionTypesComponent},

					{ path: 'locationtrackings', component: LocationTrackingsComponent},

					{ path: 'inspections', component: InspectionsComponent},

					{ path: 'examresults', component: ExamResultsComponent},

					{ path: 'encodingresponses', component: EncodingResponsesComponent},

					{ path: 'encodingmapperquestions', component: EncodingMapperQuestionsComponent},

					{ path: 'trainingcenters', component: TrainingCentersComponent},

					{ path: 'domaintrainingcenters', component: DomainTrainingCentersComponent},

					{ path: 'domainsettings', component: DomainSettingsComponent},

					{ path: 'questiongroups', component: QuestionGroupsComponent},

					{ path: 'questions', component: QuestionsComponent},

					{ path: 'responses', component: ResponsesComponent},

					{ path: 'comments', component: CommentsComponent},

					{ path: 'samples', component: SamplesComponent},

					{ path: 'surveys', component: SurveysComponent},

					{ path: 'callbackresponses', component: CallBackResponsesComponent},

					{ path: 'assettypes', component: AssetTypesComponent},

					{ path: 'approvalrequeststeps', component: ApprovalRequestStepsComponent},

					{ path: 'approvalsteps', component: ApprovalStepsComponent},

					{ path: 'approvalrequests', component: ApprovalRequestsComponent},

					{ path: 'phases', component: PhasesComponent},

					{ path: 'applications', component: ApplicationsComponent},

					{ path: 'applicationcategories', component: ApplicationCategoriesComponent},

					{ path: 'domaingroupcategories', component: DomainGroupCategoriesComponent},

					{ path: 'domaingroupsubcategories', component: DomainGroupSubCategoriesComponent},

					{ path: 'domaingroups', component: DomainGroupsComponent},

					{ path: 'domains', component: DomainsComponent},

					{ path: 'announcements', component: AnnouncementsComponent},

                    { path: 'home', component: HomeComponent },
                    { path: 'about', component: AboutComponent }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }