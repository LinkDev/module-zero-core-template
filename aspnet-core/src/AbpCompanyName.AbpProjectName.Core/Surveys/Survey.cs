using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class Survey : Entity<Guid>, IPassivable
	{
				
		[Required]
		[StringLength(200)]
		public string Name { get; set; }
						
		[Required]
		public bool IsActive { get; set; }
						
		public Guid? ParentSurveyId { get; set; }
						
		public int? ParentSurveyRelation { get; set; }
						
		[Required]
		public bool IsEnabled { get; set; }
						
		[StringLength(50)]
		public string Code { get; set; }
						
		[StringLength(200)]
		public string Icon { get; set; }
						
		[Required]
		public bool AllowAddResponse { get; set; }
						
		[StringLength(50)]
		public string TypeText { get; set; }
						
		public int? SerialDigitsCount { get; set; }
						
		public DateTime? LastUpdateTime { get; set; }
						
		public int? MinMinutes { get; set; }
						
		[Required]
		public int ProgressCalculationType { get; set; }
						
		public int? DailyTarget { get; set; }
						
		public bool? IsTemplate { get; set; }
		
		public virtual Survey ParentSurvey { get; set; }
		public virtual Collection<CallBackResponse> CallBackResponses { get; set; }
		public virtual Collection<DomainSetting> DomainSettings { get; set; }
		public virtual Collection<PhaseSurvey> PhaseSurveys { get; set; }
		public virtual Collection<QuestionGroup> QuestionGroups { get; set; }
		public virtual Collection<Survey> Surveys { get; set; }
		public virtual Collection<UserSurveysTemplate> UserSurveysTemplates { get; set; }

	}
}