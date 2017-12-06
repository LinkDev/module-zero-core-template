using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class QuestionnaireQuestion : Entity<Guid>
	{
				
		[Required]
		[StringLength(500)]
		public string Title { get; set; }
						
		public string Brief { get; set; }
						
		[Required]
		public Guid QuestionnaireId { get; set; }
						
		[Required]
		public int AnswerType { get; set; }
						
		[Required]
		public int Score { get; set; }
						
		[Required]
		public int Order { get; set; }
		
		public virtual Questionnaire Questionnaire { get; set; }
		public virtual Collection<QuestionnaireQuestionAnswer> QuestionnaireQuestionAnswers { get; set; }
		public virtual Collection<QuestionnaireQuestionAttachment> QuestionnaireQuestionAttachments { get; set; }

	}
}