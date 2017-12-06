using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class Phase : Entity<Guid>, IPassivable
	{
				
		[Required]
		[StringLength(200)]
		public string Name { get; set; }
						
		[Required]
		public Guid ApplicationId { get; set; }
						
		public DateTime? From { get; set; }
						
		public DateTime? To { get; set; }
						
		[Required]
		public int Order { get; set; }
						
		[Required]
		public bool IsActive { get; set; }
						
		[Required]
		public Guid BaseDomainGroupId { get; set; }
						
		public Guid? DomainGroupId { get; set; }
						
		public Guid? DefaultSurveyId { get; set; }
		
		public virtual Application Application { get; set; }
		public virtual DomainGroup BaseDomainGroup { get; set; }
		public virtual DomainGroup DomainGroup { get; set; }
		public virtual Collection<Application> Applications { get; set; }
		public virtual Collection<CallBackResponse> CallBackResponses { get; set; }
		public virtual Collection<Inspection> Inspections { get; set; }
		public virtual Collection<PhaseQuestion> PhaseQuestions { get; set; }
		public virtual Collection<PhaseSurvey> PhaseSurveys { get; set; }
		public virtual Collection<Questionnaire> Questionnaires { get; set; }
		public virtual Collection<TrainingProgram> TrainingPrograms { get; set; }
		public virtual Collection<UploadedReport> UploadedReports { get; set; }

	}
}