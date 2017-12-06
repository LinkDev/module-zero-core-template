using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class QuestionnaireExamResult : Entity<Guid>
	{
				
		[Required]
		[StringLength(244)]
		public string UserId { get; set; }
						
		[Required]
		public Guid QuestionnaireId { get; set; }
						
		[Required]
		public int UserScore { get; set; }
						
		[Required]
		public int TotalScore { get; set; }
						
		[Required]
		public DateTime SubmitDate { get; set; }
		
		public virtual Questionnaire Questionnaire { get; set; }

	}
}