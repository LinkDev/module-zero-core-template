import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AbpModule } from '@abp/abp.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppSessionService } from './session/app-session.service';
import { AppUrlService } from './nav/app-url.service';
import { AppAuthService } from './auth/app-auth.service';
import { AppRouteGuard } from './auth/auth-route-guard';
import { MaterialInput } from "shared/directives/material-input.directive";
import { DatePickerInput } from 'shared/input-controls/input-date';
import { PaginationComponent } from 'shared/pagination/pagination.component';
import { SharedMaterialModule } from 'shared/shared-material.module';
import { FileUploadModule } from 'ng2-file-upload';
import 'hammerjs';
import * as Proxies from "shared/service-proxies/service-proxies";
import { DropdownComponent } from "shared/components/dropdown.component"
import { TreeModule } from 'angular-tree-component';
import { TreeComponent } from "shared/components/tree.component"
import { AppConsts } from '@shared/AppConsts';
import { SelectInput } from "shared/input-controls/input-select";
import { UploadInput } from "shared/components/upload-input";
import { UploadImageInput } from "shared/components/upload-image";
import { RichEditorInput } from "shared/input-controls/input-richEditor";
import { InputComponent } from "shared/input-controls/input-text";
import { ValidateComponent } from "shared/components/validation.component";
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
export function getRemoteServiceBaseUrl(): string {
	return AppConsts.remoteServiceBaseUrl;
}
@NgModule({
	imports: [
		SharedMaterialModule,
		FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
		CommonModule,
		AbpModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		TreeModule,
		FileUploadModule
	],
	declarations: [
		MaterialInput,
		DatePickerInput,
		SelectInput,
		DropdownComponent,
		TreeComponent,
		RichEditorInput,
		UploadInput,
		UploadImageInput,
		InputComponent,
		ValidateComponent

	],
	exports: [
		MaterialInput,
		DatePickerInput,
		SelectInput,
		DropdownComponent,
		TreeComponent,
		RichEditorInput,
		UploadInput,
		UploadImageInput,
		InputComponent,
		ValidateComponent
	],
	providers:[	{provide: 'WorkingDataByUserServiceProxy', useClass: Proxies.WorkingDataByUserServiceProxy},
	{provide: 'ViolatedValidationRuleServiceProxy', useClass: Proxies.ViolatedValidationRuleServiceProxy},
	{provide: 'UserSurveysTemplateServiceProxy', useClass: Proxies.UserSurveysTemplateServiceProxy},
	{provide: 'UsersAssignmentServiceProxy', useClass: Proxies.UsersAssignmentServiceProxy},
	{provide: 'UsersActiveDomainServiceProxy', useClass: Proxies.UsersActiveDomainServiceProxy},
	{provide: 'UserProfilesProgressServiceProxy', useClass: Proxies.UserProfilesProgressServiceProxy},
	{provide: 'UserProfileServiceProxy', useClass: Proxies.UserProfileServiceProxy},
	{provide: 'UserLocationByDomainsHistoryServiceProxy', useClass: Proxies.UserLocationByDomainsHistoryServiceProxy},
	{provide: 'UserLocationByDomainServiceProxy', useClass: Proxies.UserLocationByDomainServiceProxy},
	{provide: 'UserDomainServiceProxy', useClass: Proxies.UserDomainServiceProxy},
	{provide: 'UserApplicationServiceProxy', useClass: Proxies.UserApplicationServiceProxy},
	{provide: 'UploadedReportServiceProxy', useClass: Proxies.UploadedReportServiceProxy},
	{provide: 'UploadedReportRoleServiceProxy', useClass: Proxies.UploadedReportRoleServiceProxy},
	{provide: 'TrainingResultServiceProxy', useClass: Proxies.TrainingResultServiceProxy},
	{provide: 'TrainingProgramDocumentServiceProxy', useClass: Proxies.TrainingProgramDocumentServiceProxy},
	{provide: 'TrainingExamServiceProxy', useClass: Proxies.TrainingExamServiceProxy},
	{provide: 'TrainingCenterUserServiceProxy', useClass: Proxies.TrainingCenterUserServiceProxy},
	{provide: 'TrainingProgramServiceProxy', useClass: Proxies.TrainingProgramServiceProxy},
	{provide: 'TrainingMemberServiceProxy', useClass: Proxies.TrainingMemberServiceProxy},
	{provide: 'TrainingAttendanceServiceProxy', useClass: Proxies.TrainingAttendanceServiceProxy},
	{provide: 'TempFilteredResponseServiceProxy', useClass: Proxies.TempFilteredResponseServiceProxy},
	{provide: 'SyncLogServiceProxy', useClass: Proxies.SyncLogServiceProxy},
	{provide: 'SimilarityPercentageServiceProxy', useClass: Proxies.SimilarityPercentageServiceProxy},
	{provide: 'SimilarityDataByQualityServiceProxy', useClass: Proxies.SimilarityDataByQualityServiceProxy},
	{provide: 'SimilarityDataByCallCenterServiceProxy', useClass: Proxies.SimilarityDataByCallCenterServiceProxy},
	{provide: 'ResponseSubStatusServiceProxy', useClass: Proxies.ResponseSubStatusServiceProxy},
	{provide: 'ReportTypeServiceProxy', useClass: Proxies.ReportTypeServiceProxy},
	{provide: 'RegExCategoryServiceProxy', useClass: Proxies.RegExCategoryServiceProxy},
	{provide: 'RegExServiceProxy', useClass: Proxies.RegExServiceProxy},
	{provide: 'RandomizedRegularDataByDomainServiceProxy', useClass: Proxies.RandomizedRegularDataByDomainServiceProxy},
	{provide: 'RandomizedRegularDatumServiceProxy', useClass: Proxies.RandomizedRegularDatumServiceProxy},
	{provide: 'QuestionTemplateValidationRuleServiceProxy', useClass: Proxies.QuestionTemplateValidationRuleServiceProxy},
	{provide: 'QuestionTemplateCategoryServiceProxy', useClass: Proxies.QuestionTemplateCategoryServiceProxy},
	{provide: 'QuestionTemplateSubCategoryServiceProxy', useClass: Proxies.QuestionTemplateSubCategoryServiceProxy},
	{provide: 'QuestionTemplateServiceProxy', useClass: Proxies.QuestionTemplateServiceProxy},
	{provide: 'QuestionTemplateAnswerServiceProxy', useClass: Proxies.QuestionTemplateAnswerServiceProxy},
	{provide: 'QuestionnaireQuestionAttachmentServiceProxy', useClass: Proxies.QuestionnaireQuestionAttachmentServiceProxy},
	{provide: 'QuestionnaireQuestionServiceProxy', useClass: Proxies.QuestionnaireQuestionServiceProxy},
	{provide: 'QuestionnaireQuestionAnswerServiceProxy', useClass: Proxies.QuestionnaireQuestionAnswerServiceProxy},
	{provide: 'QuestionnaireServiceProxy', useClass: Proxies.QuestionnaireServiceProxy},
	{provide: 'QuestionnaireExamResultServiceProxy', useClass: Proxies.QuestionnaireExamResultServiceProxy},
	{provide: 'QuestionAttachmentServiceProxy', useClass: Proxies.QuestionAttachmentServiceProxy},
	{provide: 'QualityCallBackResponseServiceProxy', useClass: Proxies.QualityCallBackResponseServiceProxy},
	{provide: 'QualityCallBackResponseAnswerServiceProxy', useClass: Proxies.QualityCallBackResponseAnswerServiceProxy},
	{provide: 'PhaseSurveyServiceProxy', useClass: Proxies.PhaseSurveyServiceProxy},
	{provide: 'PhaseQuestionServiceProxy', useClass: Proxies.PhaseQuestionServiceProxy},
	{provide: 'OnlineRegistrationResponseServiceProxy', useClass: Proxies.OnlineRegistrationResponseServiceProxy},
	{provide: 'LogServiceProxy', useClass: Proxies.LogServiceProxy},
	{provide: 'LogActionTypeServiceProxy', useClass: Proxies.LogActionTypeServiceProxy},
	{provide: 'LocationTrackingServiceProxy', useClass: Proxies.LocationTrackingServiceProxy},
	{provide: 'InspectionServiceProxy', useClass: Proxies.InspectionServiceProxy},
	{provide: 'ExamResultServiceProxy', useClass: Proxies.ExamResultServiceProxy},
	{provide: 'EncodingResponseServiceProxy', useClass: Proxies.EncodingResponseServiceProxy},
	{provide: 'EncodingMapperQuestionServiceProxy', useClass: Proxies.EncodingMapperQuestionServiceProxy},
	{provide: 'TrainingCenterServiceProxy', useClass: Proxies.TrainingCenterServiceProxy},
	{provide: 'DomainTrainingCenterServiceProxy', useClass: Proxies.DomainTrainingCenterServiceProxy},
	{provide: 'DomainSettingServiceProxy', useClass: Proxies.DomainSettingServiceProxy},
	{provide: 'QuestionGroupServiceProxy', useClass: Proxies.QuestionGroupServiceProxy},
	{provide: 'QuestionServiceProxy', useClass: Proxies.QuestionServiceProxy},
	{provide: 'ResponseServiceProxy', useClass: Proxies.ResponseServiceProxy},
	{provide: 'CommentServiceProxy', useClass: Proxies.CommentServiceProxy},
	{provide: 'SampleServiceProxy', useClass: Proxies.SampleServiceProxy},
	{provide: 'SurveyServiceProxy', useClass: Proxies.SurveyServiceProxy},
	{provide: 'CallBackResponseServiceProxy', useClass: Proxies.CallBackResponseServiceProxy},
	{provide: 'AssetTypeServiceProxy', useClass: Proxies.AssetTypeServiceProxy},
	{provide: 'ApprovalRequestStepServiceProxy', useClass: Proxies.ApprovalRequestStepServiceProxy},
	{provide: 'ApprovalStepServiceProxy', useClass: Proxies.ApprovalStepServiceProxy},
	{provide: 'ApprovalRequestServiceProxy', useClass: Proxies.ApprovalRequestServiceProxy},
	{provide: 'PhaseServiceProxy', useClass: Proxies.PhaseServiceProxy},
	{provide: 'ApplicationServiceProxy', useClass: Proxies.ApplicationServiceProxy},
	{provide: 'ApplicationCategoryServiceProxy', useClass: Proxies.ApplicationCategoryServiceProxy},
	{provide: 'DomainGroupCategoryServiceProxy', useClass: Proxies.DomainGroupCategoryServiceProxy},
	{provide: 'DomainGroupSubCategoryServiceProxy', useClass: Proxies.DomainGroupSubCategoryServiceProxy},
	{provide: 'DomainGroupServiceProxy', useClass: Proxies.DomainGroupServiceProxy},
	{provide: 'DomainServiceProxy', useClass: Proxies.DomainServiceProxy},
	{provide: 'AnnouncementServiceProxy', useClass: Proxies.AnnouncementServiceProxy},

		Proxies.ValidationServiceProxy,
		{provide: 'DomainServiceProxy', useClass: Proxies.DomainServiceProxy}
	]
})
export class SharedModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: SharedModule,
			providers: [
				AppSessionService,
				AppUrlService,
				AppAuthService,
				AppRouteGuard
			]
		}
	}
}
