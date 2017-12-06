
using Microsoft.EntityFrameworkCore;

namespace AbpCompanyName.AbpProjectName.EntityFrameworkCore
{
    public partial class AbpProjectNameDbContext 
    {
		public virtual DbSet<Announcement> Announcements { get; set; }
		public virtual DbSet<Domain> Domains { get; set; }
		public virtual DbSet<DomainGroup> DomainGroups { get; set; }
		public virtual DbSet<DomainGroupSubCategory> DomainGroupSubCategories { get; set; }
		public virtual DbSet<DomainGroupCategory> DomainGroupCategories { get; set; }
		public virtual DbSet<ApplicationCategory> ApplicationCategories { get; set; }
		public virtual DbSet<Application> Applications { get; set; }
		public virtual DbSet<Phase> Phases { get; set; }
		public virtual DbSet<ApprovalRequest> ApprovalRequests { get; set; }
		public virtual DbSet<ApprovalStep> ApprovalSteps { get; set; }
		public virtual DbSet<ApprovalRequestStep> ApprovalRequestSteps { get; set; }
		public virtual DbSet<AssetType> AssetTypes { get; set; }
		public virtual DbSet<CallBackResponse> CallBackResponses { get; set; }
		public virtual DbSet<Survey> Surveys { get; set; }
		public virtual DbSet<Sample> Samples { get; set; }
		public virtual DbSet<Comment> Comments { get; set; }
		public virtual DbSet<Response> Responses { get; set; }
		public virtual DbSet<Question> Questions { get; set; }
		public virtual DbSet<QuestionGroup> QuestionGroups { get; set; }
		public virtual DbSet<DomainSetting> DomainSettings { get; set; }
		public virtual DbSet<DomainTrainingCenter> DomainTrainingCenters { get; set; }
		public virtual DbSet<TrainingCenter> TrainingCenters { get; set; }
		public virtual DbSet<EncodingMapperQuestion> EncodingMapperQuestions { get; set; }
		public virtual DbSet<EncodingResponse> EncodingResponses { get; set; }
		public virtual DbSet<ExamResult> ExamResults { get; set; }
		public virtual DbSet<Inspection> Inspections { get; set; }
		public virtual DbSet<LocationTracking> LocationTracking { get; set; }
		public virtual DbSet<LogActionType> LogActionTypes { get; set; }
		public virtual DbSet<Log> Logs { get; set; }
		public virtual DbSet<OnlineRegistrationResponse> OnlineRegistrationResponses { get; set; }
		public virtual DbSet<PhaseQuestion> PhaseQuestions { get; set; }
		public virtual DbSet<PhaseSurvey> PhaseSurveys { get; set; }
		public virtual DbSet<QualityCallBackResponseAnswer> QualityCallBackResponseAnswers { get; set; }
		public virtual DbSet<QualityCallBackResponse> QualityCallBackResponses { get; set; }
		public virtual DbSet<QuestionAnswer> QuestionAnswers { get; set; }
		public virtual DbSet<QuestionAttachment> QuestionAttachments { get; set; }
		public virtual DbSet<QuestionnaireExamResult> QuestionnaireExamResults { get; set; }
		public virtual DbSet<Questionnaire> Questionnaires { get; set; }
		public virtual DbSet<QuestionnaireQuestionAnswer> QuestionnaireQuestionAnswers { get; set; }
		public virtual DbSet<QuestionnaireQuestion> QuestionnaireQuestions { get; set; }
		public virtual DbSet<QuestionnaireQuestionAttachment> QuestionnaireQuestionAttachments { get; set; }
		public virtual DbSet<QuestionTemplateAnswer> QuestionTemplateAnswers { get; set; }
		public virtual DbSet<QuestionTemplate> QuestionTemplates { get; set; }
		public virtual DbSet<QuestionTemplateSubCategory> QuestionTemplateSubCategories { get; set; }
		public virtual DbSet<QuestionTemplateCategory> QuestionTemplateCategories { get; set; }
		public virtual DbSet<QuestionTemplateValidationRule> QuestionTemplateValidationRules { get; set; }
		public virtual DbSet<RandomizedRegularDatum> RandomizedRegularData { get; set; }
		public virtual DbSet<RandomizedRegularDataByDomain> RandomizedRegularDataByDomains { get; set; }
		public virtual DbSet<RegEx> RegEx { get; set; }
		public virtual DbSet<RegExCategory> RegExCategory { get; set; }
		public virtual DbSet<ReportType> ReportTypes { get; set; }
		public virtual DbSet<ResponseSubStatus> ResponseSubStatus { get; set; }
		public virtual DbSet<SimilarityDataByCallCenter> SimilarityDataByCallCenter { get; set; }
		public virtual DbSet<SimilarityDataByQuality> SimilarityDataByQuality { get; set; }
		public virtual DbSet<SimilarityPercentage> SimilarityPercentage { get; set; }
		public virtual DbSet<SyncLog> SyncLogs { get; set; }
		public virtual DbSet<TempFilteredResponse> TempFilteredResponses { get; set; }
		public virtual DbSet<TrainingAttendance> TrainingAttendances { get; set; }
		public virtual DbSet<TrainingMember> TrainingMembers { get; set; }
		public virtual DbSet<TrainingProgram> TrainingPrograms { get; set; }
		public virtual DbSet<TrainingCenterUser> TrainingCenterUsers { get; set; }
		public virtual DbSet<TrainingExam> TrainingExams { get; set; }
		public virtual DbSet<TrainingProgramDocument> TrainingProgramDocuments { get; set; }
		public virtual DbSet<TrainingResult> TrainingResults { get; set; }
		public virtual DbSet<UploadedReportRole> UploadedReportRoles { get; set; }
		public virtual DbSet<UploadedReport> UploadedReports { get; set; }
		public virtual DbSet<UserApplication> UserApplications { get; set; }
		public virtual DbSet<UserDomain> UserDomains { get; set; }
		public virtual DbSet<UserLocationByDomain> UserLocationByDomains { get; set; }
		public virtual DbSet<UserLocationByDomainsHistory> UserLocationByDomainsHistory { get; set; }
		public virtual DbSet<UserProfile> UserProfiles { get; set; }
		public virtual DbSet<UserProfilesProgress> UserProfilesProgress { get; set; }
		public virtual DbSet<UsersActiveDomain> UsersActiveDomains { get; set; }
		public virtual DbSet<UsersAssignment> UsersAssignment { get; set; }
		public virtual DbSet<UserSurveysTemplate> UserSurveysTemplates { get; set; }
		public virtual DbSet<ValidationRule> ValidationRules { get; set; }
		public virtual DbSet<ViolatedValidationRule> ViolatedValidationRules { get; set; }
		public virtual DbSet<WorkingDataByUser> WorkingDataByUsers { get; set; }
		
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
			base.OnModelCreating(modelBuilder);

 
 
			modelBuilder.Entity<Announcement>()
				.Property("Id")
				.HasColumnName("AnnouncementId");
 
 
			modelBuilder.Entity<Domain>()
				.Property("Id")
				.HasColumnName("DomainId");
 
 
			modelBuilder.Entity<DomainGroup>()
				.Property("Id")
				.HasColumnName("DomainGroupId");
 
 
			modelBuilder.Entity<DomainGroupSubCategory>()
				.Property("Id")
				.HasColumnName("DomainGroupSubCategoryId");
 
 
			modelBuilder.Entity<DomainGroupCategory>()
				.Property("Id")
				.HasColumnName("DomainGroupCategoryId");
 
 
			modelBuilder.Entity<ApplicationCategory>()
				.Property("Id")
				.HasColumnName("ApplicationCategoryId");
 
 
			modelBuilder.Entity<Application>()
				.Property("Id")
				.HasColumnName("ApplicationId");
 
 
			modelBuilder.Entity<Phase>()
				.Property("Id")
				.HasColumnName("PhaseId");
 
 
			modelBuilder.Entity<ApprovalRequest>()
				.Property("Id")
				.HasColumnName("ApprovalRequestId");
 
 
			modelBuilder.Entity<ApprovalStep>()
				.Property("Id")
				.HasColumnName("ApprovalStepId");
 
 
			modelBuilder.Entity<ApprovalRequestStep>()
				.Property("Id")
				.HasColumnName("ApprovalRequestStepId");
 
 
			modelBuilder.Entity<AssetType>()
				.Property("Id")
				.HasColumnName("AssetTypeId");
 
 
			modelBuilder.Entity<CallBackResponse>()
				.Property("Id")
				.HasColumnName("CallBackResponseId");
 
			modelBuilder.Entity<CallBackResponse>()
				.Property("Correspondence")
				.HasColumnName("correspondence");
 
			modelBuilder.Entity<CallBackResponse>()
				.Property("CbParentResponseId")
				.HasColumnName("cbParentResponseId");
 
			modelBuilder.Entity<CallBackResponse>()
				.Property("ResponseStatus")
				.HasColumnName("Response_Status");
 
 
			modelBuilder.Entity<Survey>()
				.Property("Id")
				.HasColumnName("SurveyId");
 
 
			modelBuilder.Entity<Sample>()
				.Property("Id")
				.HasColumnName("SampleId");
 
 
			modelBuilder.Entity<Comment>()
				.Property("Id")
				.HasColumnName("CommentId");
 
 
			modelBuilder.Entity<Response>()
				.Property("Id")
				.HasColumnName("ResponseId");
 
 
			modelBuilder.Entity<Question>()
				.Property("Id")
				.HasColumnName("QuestionId");
 
 
			modelBuilder.Entity<QuestionGroup>()
				.Property("Id")
				.HasColumnName("QuestionGroupId");
 
 
			modelBuilder.Entity<DomainSetting>()
				.Property("Id")
				.HasColumnName("DomainSettingId");
 
 
			modelBuilder.Entity<TrainingCenter>()
				.Property("Id")
				.HasColumnName("TrainingCenterId");
 
 
			modelBuilder.Entity<EncodingMapperQuestion>()
				.Property("Id")
				.HasColumnName("EncodingMapperQuestionId");
 
 
			modelBuilder.Entity<EncodingResponse>()
				.Property("Id")
				.HasColumnName("ResponseId");
 
 
			modelBuilder.Entity<ExamResult>()
				.Property("Id")
				.HasColumnName("QuestionnaireExamResultId");
 
 
			modelBuilder.Entity<Inspection>()
				.Property("Id")
				.HasColumnName("InspectionId");
 
 
			modelBuilder.Entity<LocationTracking>()
				.Property("Id")
				.HasColumnName("LocationTrackingId");
 
 
			modelBuilder.Entity<OnlineRegistrationResponse>()
				.Property("Id")
				.HasColumnName("ResponseId");
 
 
			modelBuilder.Entity<QualityCallBackResponseAnswer>()
				.Property("Id")
				.HasColumnName("id");
 
 
			modelBuilder.Entity<QualityCallBackResponse>()
				.Property("Id")
				.HasColumnName("id");
 
 
			modelBuilder.Entity<QuestionAnswer>()
				.Property("Id")
				.HasColumnName("QuestionAnswerId");
 
 
			modelBuilder.Entity<QuestionAttachment>()
				.Property("Id")
				.HasColumnName("AttachmentId");
 
 
			modelBuilder.Entity<QuestionnaireExamResult>()
				.Property("Id")
				.HasColumnName("QuestionnaireExamResultId");
 
 
			modelBuilder.Entity<Questionnaire>()
				.Property("Id")
				.HasColumnName("QuestionnaireId");
 
 
			modelBuilder.Entity<QuestionnaireQuestionAnswer>()
				.Property("Id")
				.HasColumnName("QuestionAnswerId");
 
 
			modelBuilder.Entity<QuestionnaireQuestion>()
				.Property("Id")
				.HasColumnName("QuestionId");
 
 
			modelBuilder.Entity<QuestionnaireQuestionAttachment>()
				.Property("Id")
				.HasColumnName("AttachmentId");
 
 
			modelBuilder.Entity<QuestionTemplateAnswer>()
				.Property("Id")
				.HasColumnName("QuestionTemplateAnswerId");
 
 
			modelBuilder.Entity<QuestionTemplate>()
				.Property("Id")
				.HasColumnName("QuestionTemplateId");
 
 
			modelBuilder.Entity<QuestionTemplateSubCategory>()
				.Property("Id")
				.HasColumnName("QuestionTemplateSubCategoryId");
 
 
			modelBuilder.Entity<QuestionTemplateCategory>()
				.Property("Id")
				.HasColumnName("QuestionTemplateCategoryId");
 
 
			modelBuilder.Entity<QuestionTemplateValidationRule>()
				.Property("Id")
				.HasColumnName("QuestionTemplateValidationRuleId");
 
 
			modelBuilder.Entity<RandomizedRegularDatum>()
				.Property("Id")
				.HasColumnName("RandomizedRegularDataId");
 
 
			modelBuilder.Entity<RandomizedRegularDataByDomain>()
				.Property("Id")
				.HasColumnName("DomainId");
 
 
			modelBuilder.Entity<RegEx>()
				.Property("Id")
				.HasColumnName("RegexId");
 
 
			modelBuilder.Entity<RegExCategory>()
				.Property("Id")
				.HasColumnName("CategoryId");
 
 
			modelBuilder.Entity<ReportType>()
				.Property("Id")
				.HasColumnName("ReportTypeId");
 
 
			modelBuilder.Entity<ResponseSubStatus>()
				.Property("Id")
				.HasColumnName("ResponseSubStatusId");
 
 
			modelBuilder.Entity<SimilarityDataByCallCenter>()
				.Property("Id")
				.HasColumnName("SimilarityDataByCallCenterId");
 
 
			modelBuilder.Entity<SimilarityDataByQuality>()
				.Property("Id")
				.HasColumnName("SimilarityDataByQualityId");
 
 
			modelBuilder.Entity<SimilarityPercentage>()
				.Property("Id")
				.HasColumnName("QualityResponseId");
 
 
			modelBuilder.Entity<SyncLog>()
				.Property("Id")
				.HasColumnName("SyncLogId");
 
 
			modelBuilder.Entity<TempFilteredResponse>()
				.Property("Id")
				.HasColumnName("ResponseId");
 
 
			modelBuilder.Entity<TrainingAttendance>()
				.Property("Id")
				.HasColumnName("TrainingAttendanceId");
 
 
			modelBuilder.Entity<TrainingMember>()
				.Property("Id")
				.HasColumnName("TrainingMemberId");
 
 
			modelBuilder.Entity<TrainingProgram>()
				.Property("Id")
				.HasColumnName("TrainingProgramId");
 
 
			modelBuilder.Entity<TrainingExam>()
				.Property("Id")
				.HasColumnName("TrainingExamId");
 
 
			modelBuilder.Entity<TrainingProgramDocument>()
				.Property("Id")
				.HasColumnName("TrainingDocumentId");
 
 
			modelBuilder.Entity<TrainingResult>()
				.Property("Id")
				.HasColumnName("TrainingResultId");
 
 
			modelBuilder.Entity<UploadedReport>()
				.Property("Id")
				.HasColumnName("UploadedReportId");
 
 
			modelBuilder.Entity<UserLocationByDomain>()
				.Property("Id")
				.HasColumnName("UserLocationByDomainId");
 
 
			modelBuilder.Entity<UserLocationByDomainsHistory>()
				.Property("Id")
				.HasColumnName("UserLocationByDomainHistoryId");
 
 
			modelBuilder.Entity<UserProfilesProgress>()
				.Property("Id")
				.HasColumnName("UserProfilesProgressId");
 
 
			modelBuilder.Entity<UsersAssignment>()
				.Property("ValidInput")
				.HasColumnName("validInput");
 
 
			modelBuilder.Entity<ValidationRule>()
				.Property("Id")
				.HasColumnName("ValidationRuleId");
 
 
			modelBuilder.Entity<WorkingDataByUser>()
				.Property("Id")
				.HasColumnName("WorkingDataByUserId");

 
			modelBuilder.Entity<DomainTrainingCenter>()
				.HasKey("TrainingCenterId", "DomainId");
 
			modelBuilder.Entity<PhaseQuestion>()
				.HasKey("PhaseId", "QuestionId");
 
			modelBuilder.Entity<PhaseSurvey>()
				.HasKey("PhaseId", "SurveyId");
 
			modelBuilder.Entity<TrainingCenterUser>()
				.HasKey("UserId", "TrainingCenterId");
 
			modelBuilder.Entity<UploadedReportRole>()
				.HasKey("UploadedReportId", "RoleId");
 
			modelBuilder.Entity<UserApplication>()
				.HasKey("ApplicationId", "UserId");
 
			modelBuilder.Entity<UserDomain>()
				.HasKey("UserId", "DomainId", "ApplicationId");
 
			modelBuilder.Entity<UsersActiveDomain>()
				.HasKey("UserId", "ActiveDomainId");
 
			modelBuilder.Entity<UserSurveysTemplate>()
				.HasKey("SurveyId", "UserId");
 
			modelBuilder.Entity<ViolatedValidationRule>()
				.HasKey("ResponseAnswerId", "ValidationRuleId");

			modelBuilder.Entity<Announcement>()
				.HasOne(typeof(Domain), "Domain")
				.WithMany("Announcements")
                .HasForeignKey("DomainId");

			modelBuilder.Entity<CallBackResponse>()
				.HasOne(typeof(Domain), "Domain")
				.WithMany("CallBackResponses")
                .HasForeignKey("DomainId");

			modelBuilder.Entity<Domain>()
				.HasOne(typeof(Domain), "ParentDomain")
				.WithMany("Domains")
                .HasForeignKey("ParentDomainId");

			modelBuilder.Entity<DomainSetting>()
				.HasOne(typeof(Domain), "Domain")
				.WithMany("DomainSettings")
                .HasForeignKey("DomainId");

			modelBuilder.Entity<DomainTrainingCenter>()
				.HasOne(typeof(Domain), "Domain")
				.WithMany("DomainTrainingCenters")
                .HasForeignKey("DomainId");

			modelBuilder.Entity<Inspection>()
				.HasOne(typeof(Domain), "Domain")
				.WithMany("Inspections")
                .HasForeignKey("DomainId");

			modelBuilder.Entity<UploadedReport>()
				.HasOne(typeof(Domain), "Domain")
				.WithMany("UploadedReports")
                .HasForeignKey("DomainId");

			modelBuilder.Entity<UserDomain>()
				.HasOne(typeof(Domain), "Domain")
				.WithMany("UserDomains")
                .HasForeignKey("DomainId");

			modelBuilder.Entity<Domain>()
				.HasOne(typeof(DomainGroup), "DomainGroup")
				.WithMany("Domains")
                .HasForeignKey("DomainGroupId");

			modelBuilder.Entity<Phase>()
				.HasOne(typeof(DomainGroup), "BaseDomainGroup")
				.WithMany("BaseDomainGroupPhases")
                .HasForeignKey("BaseDomainGroupId");

			modelBuilder.Entity<Phase>()
				.HasOne(typeof(DomainGroup), "DomainGroup")
				.WithMany("DomainGroupPhases")
                .HasForeignKey("DomainGroupId");

			modelBuilder.Entity<Question>()
				.HasOne(typeof(DomainGroup), "DomainGroup")
				.WithMany("Questions")
                .HasForeignKey("DomainGroupId");

			modelBuilder.Entity<DomainGroup>()
				.HasOne(typeof(DomainGroupSubCategory), "SubCategory")
				.WithMany("DomainGroups")
                .HasForeignKey("SubCategoryId");

			modelBuilder.Entity<DomainGroupSubCategory>()
				.HasOne(typeof(DomainGroupCategory), "DomainGroupCategory")
				.WithMany("DomainGroupSubCategories")
                .HasForeignKey("DomainGroupCategoryId");

			modelBuilder.Entity<Application>()
				.HasOne(typeof(ApplicationCategory), "Category")
				.WithMany("Applications")
                .HasForeignKey("CategoryId");

			modelBuilder.Entity<Phase>()
				.HasOne(typeof(Application), "Application")
				.WithMany("Phases")
                .HasForeignKey("ApplicationId");

			modelBuilder.Entity<UserApplication>()
				.HasOne(typeof(Application), "Application")
				.WithMany("UserApplications")
                .HasForeignKey("ApplicationId");

			modelBuilder.Entity<UserDomain>()
				.HasOne(typeof(Application), "Application")
				.WithMany("UserDomains")
                .HasForeignKey("ApplicationId");

			modelBuilder.Entity<Application>()
				.HasOne(typeof(Phase), "CurrentPhase")
				.WithMany("Applications")
                .HasForeignKey("CurrentPhaseId");

			modelBuilder.Entity<CallBackResponse>()
				.HasOne(typeof(Phase), "Phase")
				.WithMany("CallBackResponses")
                .HasForeignKey("PhaseId");

			modelBuilder.Entity<Inspection>()
				.HasOne(typeof(Phase), "Phase")
				.WithMany("Inspections")
                .HasForeignKey("PhaseId");

			modelBuilder.Entity<PhaseQuestion>()
				.HasOne(typeof(Phase), "Phase")
				.WithMany("PhaseQuestions")
                .HasForeignKey("PhaseId");

			modelBuilder.Entity<PhaseSurvey>()
				.HasOne(typeof(Phase), "Phase")
				.WithMany("PhaseSurveys")
                .HasForeignKey("PhaseId");

			modelBuilder.Entity<Questionnaire>()
				.HasOne(typeof(Phase), "Phase")
				.WithMany("Questionnaires")
                .HasForeignKey("PhaseId");

			modelBuilder.Entity<TrainingProgram>()
				.HasOne(typeof(Phase), "Phase")
				.WithMany("TrainingPrograms")
                .HasForeignKey("PhaseId");

			modelBuilder.Entity<UploadedReport>()
				.HasOne(typeof(Phase), "Phase")
				.WithMany("UploadedReports")
                .HasForeignKey("PhaseId");

			modelBuilder.Entity<ApprovalRequestStep>()
				.HasOne(typeof(ApprovalRequest), "ApprovalRequest")
				.WithMany("ApprovalRequestSteps")
                .HasForeignKey("ApprovalRequestId");

			modelBuilder.Entity<ApprovalRequest>()
				.HasOne(typeof(ApprovalStep), "ApprovalStep")
				.WithMany("ApprovalRequests")
                .HasForeignKey("ApprovalStepId");

			modelBuilder.Entity<ApprovalRequestStep>()
				.HasOne(typeof(ApprovalStep), "ApprovalStep")
				.WithMany("ApprovalRequestSteps")
                .HasForeignKey("ApprovalStepId");

			modelBuilder.Entity<CallBackResponse>()
				.HasOne(typeof(CallBackResponse), "cbParentResponse")
				.WithMany("CallBackResponses")
                .HasForeignKey("CbParentResponseId");

			modelBuilder.Entity<CallBackResponse>()
				.HasOne(typeof(Survey), "Survey")
				.WithMany("CallBackResponses")
                .HasForeignKey("SurveyId");

			modelBuilder.Entity<DomainSetting>()
				.HasOne(typeof(Survey), "Survey")
				.WithMany("DomainSettings")
                .HasForeignKey("SurveyId");

			modelBuilder.Entity<PhaseSurvey>()
				.HasOne(typeof(Survey), "Survey")
				.WithMany("PhaseSurveys")
                .HasForeignKey("SurveyId");

			modelBuilder.Entity<QuestionGroup>()
				.HasOne(typeof(Survey), "Survey")
				.WithMany("QuestionGroups")
                .HasForeignKey("SurveyId");

			modelBuilder.Entity<Survey>()
				.HasOne(typeof(Survey), "ParentSurvey")
				.WithMany("Surveys")
                .HasForeignKey("ParentSurveyId");

			modelBuilder.Entity<UserSurveysTemplate>()
				.HasOne(typeof(Survey), "Survey")
				.WithMany("UserSurveysTemplates")
                .HasForeignKey("SurveyId");

			modelBuilder.Entity<CallBackResponse>()
				.HasOne(typeof(Sample), "Sample")
				.WithMany("CallBackResponses")
                .HasForeignKey("SampleID");

			modelBuilder.Entity<Comment>()
				.HasOne(typeof(Response), "Response")
				.WithMany("Comments")
                .HasForeignKey("ResponseId");

			modelBuilder.Entity<Comment>()
				.HasOne(typeof(Question), "Question")
				.WithMany("Comments")
                .HasForeignKey("QuestionId");

			modelBuilder.Entity<PhaseQuestion>()
				.HasOne(typeof(Question), "Question")
				.WithMany("PhaseQuestions")
                .HasForeignKey("QuestionId");

			modelBuilder.Entity<QuestionAnswer>()
				.HasOne(typeof(Question), "Question")
				.WithMany("QuestionAnswers")
                .HasForeignKey("QuestionId");

			modelBuilder.Entity<QuestionAttachment>()
				.HasOne(typeof(Question), "Question")
				.WithMany("QuestionAttachments")
                .HasForeignKey("QuestionId");

			modelBuilder.Entity<ValidationRule>()
				.HasOne(typeof(Question), "Question")
				.WithMany("ValidationRules")
                .HasForeignKey("QuestionId");

			modelBuilder.Entity<Comment>()
				.HasOne(typeof(QuestionGroup), "QuestionGroup")
				.WithMany("Comments")
                .HasForeignKey("QuestionGroupId");

			modelBuilder.Entity<Question>()
				.HasOne(typeof(QuestionGroup), "QuestionGroup")
				.WithMany("Questions")
                .HasForeignKey("QuestionGroupId");

			modelBuilder.Entity<DomainTrainingCenter>()
				.HasOne(typeof(TrainingCenter), "TrainingCenter")
				.WithMany("DomainTrainingCenters")
                .HasForeignKey("TrainingCenterId");

			modelBuilder.Entity<TrainingCenterUser>()
				.HasOne(typeof(TrainingCenter), "TrainingCenter")
				.WithMany("TrainingCenterUsers")
                .HasForeignKey("TrainingCenterId");

			modelBuilder.Entity<TrainingMember>()
				.HasOne(typeof(TrainingCenter), "TrainingCenter")
				.WithMany("TrainingMembers")
                .HasForeignKey("TrainingCenterId");

			modelBuilder.Entity<QuestionnaireExamResult>()
				.HasOne(typeof(Questionnaire), "Questionnaire")
				.WithMany("QuestionnaireExamResults")
                .HasForeignKey("QuestionnaireId");

			modelBuilder.Entity<QuestionnaireQuestion>()
				.HasOne(typeof(Questionnaire), "Questionnaire")
				.WithMany("QuestionnaireQuestions")
                .HasForeignKey("QuestionnaireId");

			modelBuilder.Entity<QuestionnaireQuestionAnswer>()
				.HasOne(typeof(QuestionnaireQuestion), "Question")
				.WithMany("QuestionnaireQuestionAnswers")
                .HasForeignKey("QuestionId");

			modelBuilder.Entity<QuestionnaireQuestionAttachment>()
				.HasOne(typeof(QuestionnaireQuestion), "Question")
				.WithMany("QuestionnaireQuestionAttachments")
                .HasForeignKey("QuestionId");

			modelBuilder.Entity<QuestionTemplateAnswer>()
				.HasOne(typeof(QuestionTemplate), "QuestionTemplate")
				.WithMany("QuestionTemplateAnswers")
                .HasForeignKey("QuestionTemplateId");

			modelBuilder.Entity<QuestionTemplateValidationRule>()
				.HasOne(typeof(QuestionTemplate), "QuestionTemplate")
				.WithMany("QuestionTemplateValidationRules")
                .HasForeignKey("QuestionTemplateId");

			modelBuilder.Entity<QuestionTemplate>()
				.HasOne(typeof(QuestionTemplateSubCategory), "QuestionTemplateSubCategory")
				.WithMany("QuestionTemplates")
                .HasForeignKey("QuestionTemplateSubCategoryId");

			modelBuilder.Entity<QuestionTemplateSubCategory>()
				.HasOne(typeof(QuestionTemplateCategory), "QuestionTemplateCategory")
				.WithMany("QuestionTemplateSubCategories")
                .HasForeignKey("QuestionTemplateCategoryId");

			modelBuilder.Entity<RegEx>()
				.HasOne(typeof(RegExCategory), "Category")
				.WithMany("Regices")
                .HasForeignKey("CategoryId");

			modelBuilder.Entity<UploadedReport>()
				.HasOne(typeof(ReportType), "ReportType")
				.WithMany("UploadedReports")
                .HasForeignKey("ReportTypeId");

			modelBuilder.Entity<TrainingAttendance>()
				.HasOne(typeof(TrainingMember), "TrainingMember")
				.WithMany("TrainingAttendances")
                .HasForeignKey("TrainingMemberId");

			modelBuilder.Entity<TrainingResult>()
				.HasOne(typeof(TrainingMember), "TrainingMember")
				.WithMany("TrainingResults")
                .HasForeignKey("TrainingMemberId");

			modelBuilder.Entity<TrainingAttendance>()
				.HasOne(typeof(TrainingProgram), "TrainingProgram")
				.WithMany("TrainingAttendances")
                .HasForeignKey("TrainingProgramId");

			modelBuilder.Entity<TrainingExam>()
				.HasOne(typeof(TrainingProgram), "TrainingProgram")
				.WithMany("TrainingExams")
                .HasForeignKey("TrainingProgramId");

			modelBuilder.Entity<TrainingMember>()
				.HasOne(typeof(TrainingProgram), "TrainingProgram")
				.WithMany("TrainingMembers")
                .HasForeignKey("TrainingProgramId");

			modelBuilder.Entity<TrainingProgramDocument>()
				.HasOne(typeof(TrainingProgram), "TrainingProgram")
				.WithMany("TrainingProgramDocuments")
                .HasForeignKey("TrainingProgramId");

			modelBuilder.Entity<TrainingResult>()
				.HasOne(typeof(TrainingExam), "TrainingExam")
				.WithMany("TrainingResults")
                .HasForeignKey("TrainingExamId");

			modelBuilder.Entity<UploadedReportRole>()
				.HasOne(typeof(UploadedReport), "UploadedReport")
				.WithMany("UploadedReportRoles")
                .HasForeignKey("UploadedReportId");

        }
    }
}