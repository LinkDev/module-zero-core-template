using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class Question : Entity<Guid>, IPassivable
	{
				
		[Required]
		public string Title { get; set; }
						
		[Required]
		public bool IsActive { get; set; }
						
		[Required]
		public int Order { get; set; }
						
		[Required]
		public int QuestionType { get; set; }
						
		public Guid? DomainGroupId { get; set; }
						
		public int? DomainGroupLevelsNumber { get; set; }
						
		[Required]
		public Guid QuestionGroupId { get; set; }
						
		[StringLength(50)]
		public string Code { get; set; }
						
		public bool? IsRequired { get; set; }
						
		public bool? IsHidden { get; set; }
						
		[StringLength(500)]
		public string Description { get; set; }
						
		[StringLength(50)]
		public string QuestionNumber { get; set; }
						
		public string Help { get; set; }
						
		public string DefaultAnswerValue { get; set; }
						
		public bool? IsUsedInCallBack { get; set; }
						
		public bool? IsUsedInEncoding { get; set; }
		
		public virtual DomainGroup DomainGroup { get; set; }
		public virtual QuestionGroup QuestionGroup { get; set; }
		public virtual Collection<Comment> Comments { get; set; }
		public virtual Collection<PhaseQuestion> PhaseQuestions { get; set; }
		public virtual Collection<QuestionAnswer> QuestionAnswers { get; set; }
		public virtual Collection<QuestionAttachment> QuestionAttachments { get; set; }
		public virtual Collection<ValidationRule> ValidationRules { get; set; }

	}
}