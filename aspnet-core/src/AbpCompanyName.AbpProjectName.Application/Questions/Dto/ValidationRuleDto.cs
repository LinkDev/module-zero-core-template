using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.Questions.Dto
{
	[AutoMap(typeof(ValidationRule))]
	public class ValidationRuleDto : EntityDto<Guid>
	{
				
		public Guid? QuestionGroupId { get; set; }
						
		public string Answers { get; set; }
						
		public string DependentQuestionId { get; set; }
						
		public string DependentAnswers { get; set; }
						
		public string DependentQuestions { get; set; }
						
		[Required(ErrorMessage = "ValidationRuleRuleTypeRequired")]
		public int RuleType { get; set; }
						
		[StringLength(500,ErrorMessage="ValidationRuleErrorMessageMaxLength")]
		public string ErrorMessage { get; set; }
						
		[Required(ErrorMessage = "ValidationRuleIsActiveRequired")]
		public bool IsActive { get; set; }
		

	}
}