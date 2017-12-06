using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.QuestionTemplateValidationRules.Dto
{
	[AutoMap(typeof(QuestionTemplateValidationRule))]
	public class QuestionTemplateValidationRuleDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "QuestionTemplateValidationRuleQuestionTemplateIdRequired")]
		public Guid QuestionTemplateId { get; set; }
				public string QuestionTemplateName { get; set; }
				
		[Required(ErrorMessage = "QuestionTemplateValidationRuleRuleTypeRequired")]
		public int RuleType { get; set; }
						
		[StringLength(500,ErrorMessage="QuestionTemplateValidationRuleErrorMessageMaxLength")]
		public string ErrorMessage { get; set; }
						
		public string Answers { get; set; }
		

	}
}