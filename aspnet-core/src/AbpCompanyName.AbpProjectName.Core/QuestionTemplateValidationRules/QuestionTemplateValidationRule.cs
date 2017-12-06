using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class QuestionTemplateValidationRule : Entity<Guid>
	{
				
		[Required]
		public Guid QuestionTemplateId { get; set; }
						
		[Required]
		public int RuleType { get; set; }
						
		[StringLength(500)]
		public string ErrorMessage { get; set; }
						
		public string Answers { get; set; }
		
		public virtual QuestionTemplate QuestionTemplate { get; set; }

	}
}