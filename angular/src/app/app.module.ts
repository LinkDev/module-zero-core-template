import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { ModalModule } from 'ngx-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AbpModule } from '@abp/abp.module';

import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';

import { HomeComponent } from '@app/home/home.component';
import { AboutComponent } from '@app/about/about.component';
import { TopBarComponent } from '@app/layout/topbar.component';
import { TopBarLanguageSwitchComponent } from '@app/layout/topbar-languageswitch.component';
import { SideBarUserAreaComponent } from '@app/layout/sidebar-user-area.component';
import { SideBarNavComponent } from '@app/layout/sidebar-nav.component';
import { SideBarFooterComponent } from '@app/layout/sidebar-footer.component';
import { RightSideBarComponent } from '@app/layout/right-sidebar.component';
import { MaterialInput } from '@shared/directives/material-input.directive';
import { PaginationComponent} from '@shared/pagination/pagination.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AnnouncementsComponent } from '@app/announcements/announcements.component';
import { AnnouncementFormComponent } from '@app/announcements/announcement-form/announcement-form.component';
import { DomainsComponent } from '@app/domains/domains.component';
import { DomainFormComponent } from '@app/domains/domain-form/domain-form.component';
import { DomainGroupsComponent } from '@app/domain-groups/domain-groups.component';
import { DomainGroupFormComponent } from '@app/domain-groups/domain-group-form/domain-group-form.component';
import { DomainGroupSubCategoriesComponent } from '@app/domain-group-sub-categories/domain-group-sub-categories.component';
import { DomainGroupSubCategoryFormComponent } from '@app/domain-group-sub-categories/domain-group-sub-category-form/domain-group-sub-category-form.component';
import { DomainGroupCategoriesComponent } from '@app/domain-group-categories/domain-group-categories.component';
import { DomainGroupCategoryFormComponent } from '@app/domain-group-categories/domain-group-category-form/domain-group-category-form.component';
import { ApplicationCategoriesComponent } from '@app/application-categories/application-categories.component';
import { ApplicationCategoryFormComponent } from '@app/application-categories/application-category-form/application-category-form.component';
import { ApplicationsComponent } from '@app/applications/applications.component';
import { ApplicationFormComponent } from '@app/applications/application-form/application-form.component';
import { PhasesComponent } from '@app/phases/phases.component';
import { PhaseFormComponent } from '@app/phases/phase-form/phase-form.component';
import { ApprovalRequestsComponent } from '@app/approval-requests/approval-requests.component';
import { ApprovalRequestFormComponent } from '@app/approval-requests/approval-request-form/approval-request-form.component';
import { ApprovalStepsComponent } from '@app/approval-steps/approval-steps.component';
import { ApprovalStepFormComponent } from '@app/approval-steps/approval-step-form/approval-step-form.component';
import { ApprovalRequestStepsComponent } from '@app/approval-request-steps/approval-request-steps.component';
import { ApprovalRequestStepFormComponent } from '@app/approval-request-steps/approval-request-step-form/approval-request-step-form.component';
import { AssetTypesComponent } from '@app/asset-types/asset-types.component';
import { AssetTypeFormComponent } from '@app/asset-types/asset-type-form/asset-type-form.component';
import { CallBackResponsesComponent } from '@app/call-back-responses/call-back-responses.component';
import { CallBackResponseFormComponent } from '@app/call-back-responses/call-back-response-form/call-back-response-form.component';
import { SurveysComponent } from '@app/surveys/surveys.component';
import { SurveyFormComponent } from '@app/surveys/survey-form/survey-form.component';
import { SamplesComponent } from '@app/samples/samples.component';
import { SampleFormComponent } from '@app/samples/sample-form/sample-form.component';
import { CommentsComponent } from '@app/comments/comments.component';
import { CommentFormComponent } from '@app/comments/comment-form/comment-form.component';
import { ResponsesComponent } from '@app/responses/responses.component';
import { ResponseFormComponent } from '@app/responses/response-form/response-form.component';
import { QuestionsComponent } from '@app/questions/questions.component';
import { QuestionFormComponent } from '@app/questions/question-form/question-form.component';
import { QuestionGroupsComponent } from '@app/question-groups/question-groups.component';
import { QuestionGroupFormComponent } from '@app/question-groups/question-group-form/question-group-form.component';
import { DomainSettingsComponent } from '@app/domain-settings/domain-settings.component';
import { DomainSettingFormComponent } from '@app/domain-settings/domain-setting-form/domain-setting-form.component';
import { DomainTrainingCentersComponent } from '@app/domain-training-centers/domain-training-centers.component';
import { DomainTrainingCenterFormComponent } from '@app/domain-training-centers/domain-training-center-form/domain-training-center-form.component';
import { TrainingCentersComponent } from '@app/training-centers/training-centers.component';
import { TrainingCenterFormComponent } from '@app/training-centers/training-center-form/training-center-form.component';
import { EncodingMapperQuestionsComponent } from '@app/encoding-mapper-questions/encoding-mapper-questions.component';
import { EncodingMapperQuestionFormComponent } from '@app/encoding-mapper-questions/encoding-mapper-question-form/encoding-mapper-question-form.component';
import { EncodingResponsesComponent } from '@app/encoding-responses/encoding-responses.component';
import { EncodingResponseFormComponent } from '@app/encoding-responses/encoding-response-form/encoding-response-form.component';
import { ExamResultsComponent } from '@app/exam-results/exam-results.component';
import { ExamResultFormComponent } from '@app/exam-results/exam-result-form/exam-result-form.component';
import { InspectionsComponent } from '@app/inspections/inspections.component';
import { InspectionFormComponent } from '@app/inspections/inspection-form/inspection-form.component';
import { LocationTrackingsComponent } from '@app/location-trackings/location-trackings.component';
import { LocationTrackingFormComponent } from '@app/location-trackings/location-tracking-form/location-tracking-form.component';
import { LogActionTypesComponent } from '@app/log-action-types/log-action-types.component';
import { LogActionTypeFormComponent } from '@app/log-action-types/log-action-type-form/log-action-type-form.component';
import { LogsComponent } from '@app/logs/logs.component';
import { LogFormComponent } from '@app/logs/log-form/log-form.component';
import { OnlineRegistrationResponsesComponent } from '@app/online-registration-responses/online-registration-responses.component';
import { OnlineRegistrationResponseFormComponent } from '@app/online-registration-responses/online-registration-response-form/online-registration-response-form.component';
import { PhaseQuestionsComponent } from '@app/phase-questions/phase-questions.component';
import { PhaseQuestionFormComponent } from '@app/phase-questions/phase-question-form/phase-question-form.component';
import { PhaseSurveysComponent } from '@app/phase-surveys/phase-surveys.component';
import { PhaseSurveyFormComponent } from '@app/phase-surveys/phase-survey-form/phase-survey-form.component';
import { QualityCallBackResponseAnswersComponent } from '@app/quality-call-back-response-answers/quality-call-back-response-answers.component';
import { QualityCallBackResponseAnswerFormComponent } from '@app/quality-call-back-response-answers/quality-call-back-response-answer-form/quality-call-back-response-answer-form.component';
import { QualityCallBackResponsesComponent } from '@app/quality-call-back-responses/quality-call-back-responses.component';
import { QualityCallBackResponseFormComponent } from '@app/quality-call-back-responses/quality-call-back-response-form/quality-call-back-response-form.component';
import { QuestionAnswersComponent } from '@app/question-answers/question-answers.component';
import { QuestionAnswerFormComponent } from '@app/question-answers/question-answer-form/question-answer-form.component';
import { QuestionAttachmentsComponent } from '@app/question-attachments/question-attachments.component';
import { QuestionAttachmentFormComponent } from '@app/question-attachments/question-attachment-form/question-attachment-form.component';
import { QuestionnaireExamResultsComponent } from '@app/questionnaire-exam-results/questionnaire-exam-results.component';
import { QuestionnaireExamResultFormComponent } from '@app/questionnaire-exam-results/questionnaire-exam-result-form/questionnaire-exam-result-form.component';
import { QuestionnairesComponent } from '@app/questionnaires/questionnaires.component';
import { QuestionnaireFormComponent } from '@app/questionnaires/questionnaire-form/questionnaire-form.component';
import { QuestionnaireQuestionAnswersComponent } from '@app/questionnaire-question-answers/questionnaire-question-answers.component';
import { QuestionnaireQuestionAnswerFormComponent } from '@app/questionnaire-question-answers/questionnaire-question-answer-form/questionnaire-question-answer-form.component';
import { QuestionnaireQuestionsComponent } from '@app/questionnaire-questions/questionnaire-questions.component';
import { QuestionnaireQuestionFormComponent } from '@app/questionnaire-questions/questionnaire-question-form/questionnaire-question-form.component';
import { QuestionnaireQuestionAttachmentsComponent } from '@app/questionnaire-question-attachments/questionnaire-question-attachments.component';
import { QuestionnaireQuestionAttachmentFormComponent } from '@app/questionnaire-question-attachments/questionnaire-question-attachment-form/questionnaire-question-attachment-form.component';
import { QuestionTemplateAnswersComponent } from '@app/question-template-answers/question-template-answers.component';
import { QuestionTemplateAnswerFormComponent } from '@app/question-template-answers/question-template-answer-form/question-template-answer-form.component';
import { QuestionTemplatesComponent } from '@app/question-templates/question-templates.component';
import { QuestionTemplateFormComponent } from '@app/question-templates/question-template-form/question-template-form.component';
import { QuestionTemplateSubCategoriesComponent } from '@app/question-template-sub-categories/question-template-sub-categories.component';
import { QuestionTemplateSubCategoryFormComponent } from '@app/question-template-sub-categories/question-template-sub-category-form/question-template-sub-category-form.component';
import { QuestionTemplateCategoriesComponent } from '@app/question-template-categories/question-template-categories.component';
import { QuestionTemplateCategoryFormComponent } from '@app/question-template-categories/question-template-category-form/question-template-category-form.component';
import { QuestionTemplateValidationRulesComponent } from '@app/question-template-validation-rules/question-template-validation-rules.component';
import { QuestionTemplateValidationRuleFormComponent } from '@app/question-template-validation-rules/question-template-validation-rule-form/question-template-validation-rule-form.component';
import { RandomizedRegularDataComponent } from '@app/randomized-regular-data/randomized-regular-data.component';
import { RandomizedRegularDatumFormComponent } from '@app/randomized-regular-data/randomized-regular-datum-form/randomized-regular-datum-form.component';
import { RandomizedRegularDataByDomainsComponent } from '@app/randomized-regular-data-by-domains/randomized-regular-data-by-domains.component';
import { RandomizedRegularDataByDomainFormComponent } from '@app/randomized-regular-data-by-domains/randomized-regular-data-by-domain-form/randomized-regular-data-by-domain-form.component';
import { RegicesComponent } from '@app/regices/regices.component';
import { RegExFormComponent } from '@app/regices/reg-ex-form/reg-ex-form.component';
import { RegExCategoriesComponent } from '@app/reg-ex-categories/reg-ex-categories.component';
import { RegExCategoryFormComponent } from '@app/reg-ex-categories/reg-ex-category-form/reg-ex-category-form.component';
import { ReportTypesComponent } from '@app/report-types/report-types.component';
import { ReportTypeFormComponent } from '@app/report-types/report-type-form/report-type-form.component';
import { ResponseSubStatusesComponent } from '@app/response-sub-statuses/response-sub-statuses.component';
import { ResponseSubStatusFormComponent } from '@app/response-sub-statuses/response-sub-status-form/response-sub-status-form.component';
import { SimilarityDataByCallCentersComponent } from '@app/similarity-data-by-call-centers/similarity-data-by-call-centers.component';
import { SimilarityDataByCallCenterFormComponent } from '@app/similarity-data-by-call-centers/similarity-data-by-call-center-form/similarity-data-by-call-center-form.component';
import { SimilarityDataByQualitiesComponent } from '@app/similarity-data-by-qualities/similarity-data-by-qualities.component';
import { SimilarityDataByQualityFormComponent } from '@app/similarity-data-by-qualities/similarity-data-by-quality-form/similarity-data-by-quality-form.component';
import { SimilarityPercentagesComponent } from '@app/similarity-percentages/similarity-percentages.component';
import { SimilarityPercentageFormComponent } from '@app/similarity-percentages/similarity-percentage-form/similarity-percentage-form.component';
import { SyncLogsComponent } from '@app/sync-logs/sync-logs.component';
import { SyncLogFormComponent } from '@app/sync-logs/sync-log-form/sync-log-form.component';
import { TempFilteredResponsesComponent } from '@app/temp-filtered-responses/temp-filtered-responses.component';
import { TempFilteredResponseFormComponent } from '@app/temp-filtered-responses/temp-filtered-response-form/temp-filtered-response-form.component';
import { TrainingAttendancesComponent } from '@app/training-attendances/training-attendances.component';
import { TrainingAttendanceFormComponent } from '@app/training-attendances/training-attendance-form/training-attendance-form.component';
import { TrainingMembersComponent } from '@app/training-members/training-members.component';
import { TrainingMemberFormComponent } from '@app/training-members/training-member-form/training-member-form.component';
import { TrainingProgramsComponent } from '@app/training-programs/training-programs.component';
import { TrainingProgramFormComponent } from '@app/training-programs/training-program-form/training-program-form.component';
import { TrainingCenterUsersComponent } from '@app/training-center-users/training-center-users.component';
import { TrainingCenterUserFormComponent } from '@app/training-center-users/training-center-user-form/training-center-user-form.component';
import { TrainingExamsComponent } from '@app/training-exams/training-exams.component';
import { TrainingExamFormComponent } from '@app/training-exams/training-exam-form/training-exam-form.component';
import { TrainingProgramDocumentsComponent } from '@app/training-program-documents/training-program-documents.component';
import { TrainingProgramDocumentFormComponent } from '@app/training-program-documents/training-program-document-form/training-program-document-form.component';
import { TrainingResultsComponent } from '@app/training-results/training-results.component';
import { TrainingResultFormComponent } from '@app/training-results/training-result-form/training-result-form.component';
import { UploadedReportRolesComponent } from '@app/uploaded-report-roles/uploaded-report-roles.component';
import { UploadedReportRoleFormComponent } from '@app/uploaded-report-roles/uploaded-report-role-form/uploaded-report-role-form.component';
import { UploadedReportsComponent } from '@app/uploaded-reports/uploaded-reports.component';
import { UploadedReportFormComponent } from '@app/uploaded-reports/uploaded-report-form/uploaded-report-form.component';
import { UserApplicationsComponent } from '@app/user-applications/user-applications.component';
import { UserApplicationFormComponent } from '@app/user-applications/user-application-form/user-application-form.component';
import { UserDomainsComponent } from '@app/user-domains/user-domains.component';
import { UserDomainFormComponent } from '@app/user-domains/user-domain-form/user-domain-form.component';
import { UserLocationByDomainsComponent } from '@app/user-location-by-domains/user-location-by-domains.component';
import { UserLocationByDomainFormComponent } from '@app/user-location-by-domains/user-location-by-domain-form/user-location-by-domain-form.component';
import { UserLocationByDomainsHistoriesComponent } from '@app/user-location-by-domains-histories/user-location-by-domains-histories.component';
import { UserLocationByDomainsHistoryFormComponent } from '@app/user-location-by-domains-histories/user-location-by-domains-history-form/user-location-by-domains-history-form.component';
import { UserProfilesComponent } from '@app/user-profiles/user-profiles.component';
import { UserProfileFormComponent } from '@app/user-profiles/user-profile-form/user-profile-form.component';
import { UserProfilesProgressesComponent } from '@app/user-profiles-progresses/user-profiles-progresses.component';
import { UserProfilesProgressFormComponent } from '@app/user-profiles-progresses/user-profiles-progress-form/user-profiles-progress-form.component';
import { UsersActiveDomainsComponent } from '@app/users-active-domains/users-active-domains.component';
import { UsersActiveDomainFormComponent } from '@app/users-active-domains/users-active-domain-form/users-active-domain-form.component';
import { UsersAssignmentsComponent } from '@app/users-assignments/users-assignments.component';
import { UsersAssignmentFormComponent } from '@app/users-assignments/users-assignment-form/users-assignment-form.component';
import { UserSurveysTemplatesComponent } from '@app/user-surveys-templates/user-surveys-templates.component';
import { UserSurveysTemplateFormComponent } from '@app/user-surveys-templates/user-surveys-template-form/user-surveys-template-form.component';
import { ValidationRulesComponent } from '@app/validation-rules/validation-rules.component';
import { ValidationRuleFormComponent } from '@app/validation-rules/validation-rule-form/validation-rule-form.component';
import { ViolatedValidationRulesComponent } from '@app/violated-validation-rules/violated-validation-rules.component';
import { ViolatedValidationRuleFormComponent } from '@app/violated-validation-rules/violated-validation-rule-form/violated-validation-rule-form.component';
import { WorkingDataByUsersComponent } from '@app/working-data-by-users/working-data-by-users.component';
import { WorkingDataByUserFormComponent } from '@app/working-data-by-users/working-data-by-user-form/working-data-by-user-form.component';
@NgModule({
    declarations: [
		WorkingDataByUsersComponent,
		WorkingDataByUserFormComponent,

		ViolatedValidationRulesComponent,
		ViolatedValidationRuleFormComponent,

		ValidationRulesComponent,
		ValidationRuleFormComponent,

		UserSurveysTemplatesComponent,
		UserSurveysTemplateFormComponent,

		UsersAssignmentsComponent,
		UsersAssignmentFormComponent,

		UsersActiveDomainsComponent,
		UsersActiveDomainFormComponent,

		UserProfilesProgressesComponent,
		UserProfilesProgressFormComponent,

		UserProfilesComponent,
		UserProfileFormComponent,

		UserLocationByDomainsHistoriesComponent,
		UserLocationByDomainsHistoryFormComponent,

		UserLocationByDomainsComponent,
		UserLocationByDomainFormComponent,

		UserDomainsComponent,
		UserDomainFormComponent,

		UserApplicationsComponent,
		UserApplicationFormComponent,

		UploadedReportsComponent,
		UploadedReportFormComponent,

		UploadedReportRolesComponent,
		UploadedReportRoleFormComponent,

		TrainingResultsComponent,
		TrainingResultFormComponent,

		TrainingProgramDocumentsComponent,
		TrainingProgramDocumentFormComponent,

		TrainingExamsComponent,
		TrainingExamFormComponent,

		TrainingCenterUsersComponent,
		TrainingCenterUserFormComponent,

		TrainingProgramsComponent,
		TrainingProgramFormComponent,

		TrainingMembersComponent,
		TrainingMemberFormComponent,

		TrainingAttendancesComponent,
		TrainingAttendanceFormComponent,

		TempFilteredResponsesComponent,
		TempFilteredResponseFormComponent,

		SyncLogsComponent,
		SyncLogFormComponent,

		SimilarityPercentagesComponent,
		SimilarityPercentageFormComponent,

		SimilarityDataByQualitiesComponent,
		SimilarityDataByQualityFormComponent,

		SimilarityDataByCallCentersComponent,
		SimilarityDataByCallCenterFormComponent,

		ResponseSubStatusesComponent,
		ResponseSubStatusFormComponent,

		ReportTypesComponent,
		ReportTypeFormComponent,

		RegExCategoriesComponent,
		RegExCategoryFormComponent,

		RegicesComponent,
		RegExFormComponent,

		RandomizedRegularDataByDomainsComponent,
		RandomizedRegularDataByDomainFormComponent,

		RandomizedRegularDataComponent,
		RandomizedRegularDatumFormComponent,

		QuestionTemplateValidationRulesComponent,
		QuestionTemplateValidationRuleFormComponent,

		QuestionTemplateCategoriesComponent,
		QuestionTemplateCategoryFormComponent,

		QuestionTemplateSubCategoriesComponent,
		QuestionTemplateSubCategoryFormComponent,

		QuestionTemplatesComponent,
		QuestionTemplateFormComponent,

		QuestionTemplateAnswersComponent,
		QuestionTemplateAnswerFormComponent,

		QuestionnaireQuestionAttachmentsComponent,
		QuestionnaireQuestionAttachmentFormComponent,

		QuestionnaireQuestionsComponent,
		QuestionnaireQuestionFormComponent,

		QuestionnaireQuestionAnswersComponent,
		QuestionnaireQuestionAnswerFormComponent,

		QuestionnairesComponent,
		QuestionnaireFormComponent,

		QuestionnaireExamResultsComponent,
		QuestionnaireExamResultFormComponent,

		QuestionAttachmentsComponent,
		QuestionAttachmentFormComponent,

		QuestionAnswersComponent,
		QuestionAnswerFormComponent,

		QualityCallBackResponsesComponent,
		QualityCallBackResponseFormComponent,

		QualityCallBackResponseAnswersComponent,
		QualityCallBackResponseAnswerFormComponent,

		PhaseSurveysComponent,
		PhaseSurveyFormComponent,

		PhaseQuestionsComponent,
		PhaseQuestionFormComponent,

		OnlineRegistrationResponsesComponent,
		OnlineRegistrationResponseFormComponent,

		LogsComponent,
		LogFormComponent,

		LogActionTypesComponent,
		LogActionTypeFormComponent,

		LocationTrackingsComponent,
		LocationTrackingFormComponent,

		InspectionsComponent,
		InspectionFormComponent,

		ExamResultsComponent,
		ExamResultFormComponent,

		EncodingResponsesComponent,
		EncodingResponseFormComponent,

		EncodingMapperQuestionsComponent,
		EncodingMapperQuestionFormComponent,

		TrainingCentersComponent,
		TrainingCenterFormComponent,

		DomainTrainingCentersComponent,
		DomainTrainingCenterFormComponent,

		DomainSettingsComponent,
		DomainSettingFormComponent,

		QuestionGroupsComponent,
		QuestionGroupFormComponent,

		QuestionsComponent,
		QuestionFormComponent,

		ResponsesComponent,
		ResponseFormComponent,

		CommentsComponent,
		CommentFormComponent,

		SamplesComponent,
		SampleFormComponent,

		SurveysComponent,
		SurveyFormComponent,

		CallBackResponsesComponent,
		CallBackResponseFormComponent,

		AssetTypesComponent,
		AssetTypeFormComponent,

		ApprovalRequestStepsComponent,
		ApprovalRequestStepFormComponent,

		ApprovalStepsComponent,
		ApprovalStepFormComponent,

		ApprovalRequestsComponent,
		ApprovalRequestFormComponent,

		PhasesComponent,
		PhaseFormComponent,

		ApplicationsComponent,
		ApplicationFormComponent,

		ApplicationCategoriesComponent,
		ApplicationCategoryFormComponent,

		DomainGroupCategoriesComponent,
		DomainGroupCategoryFormComponent,

		DomainGroupSubCategoriesComponent,
		DomainGroupSubCategoryFormComponent,

		DomainGroupsComponent,
		DomainGroupFormComponent,

		DomainsComponent,
		DomainFormComponent,

		AnnouncementsComponent,
		AnnouncementFormComponent,

        AppComponent,
        PaginationComponent,
        HomeComponent,
        AboutComponent,
        TopBarComponent,
        TopBarLanguageSwitchComponent,
        SideBarUserAreaComponent,
        SideBarNavComponent,
        SideBarFooterComponent,
        RightSideBarComponent
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
