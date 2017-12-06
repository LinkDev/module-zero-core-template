using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.QuestionTemplateAnswers.Dto
{
	[AutoMap(typeof(QuestionTemplateAnswer))]
	public class QuestionTemplateAnswerDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "QuestionTemplateAnswerQuestionTemplateIdRequired")]
		public Guid QuestionTemplateId { get; set; }
				public string QuestionTemplateName { get; set; }
				
		[Required(ErrorMessage = "QuestionTemplateAnswerNameRequired")]
		[StringLength(200,ErrorMessage="QuestionTemplateAnswerNameMaxLength")]
		public string Name { get; set; }
						
		[StringLength(200,ErrorMessage="QuestionTemplateAnswerNameEnMaxLength")]
		public string NameEn { get; set; }
						
		[StringLength(50,ErrorMessage="QuestionTemplateAnswerCodeMaxLength")]
		public string Code { get; set; }
						
		public int? Order { get; set; }
		

	}
}