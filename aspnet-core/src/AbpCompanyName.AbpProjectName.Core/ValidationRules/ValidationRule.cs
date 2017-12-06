using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class ValidationRule : Entity<Guid>, IPassivable
	{
				
		public Guid? QuestionId { get; set; }
						
		public Guid? QuestionGroupId { get; set; }
						
		public string Answers { get; set; }
						
		public string DependentQuestionId { get; set; }
						
		public string DependentAnswers { get; set; }
						
		public string DependentQuestions { get; set; }
						
		[Required]
		public int RuleType { get; set; }
						
		[StringLength(500)]
		public string ErrorMessage { get; set; }
						
		[Required]
		public bool IsActive { get; set; }
		
		public virtual Question Question { get; set; }

	}
}