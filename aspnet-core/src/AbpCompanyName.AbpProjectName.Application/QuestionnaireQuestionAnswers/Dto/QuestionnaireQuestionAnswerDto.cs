using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.QuestionnaireQuestionAnswers.Dto
{
	[AutoMap(typeof(QuestionnaireQuestionAnswer))]
	public class QuestionnaireQuestionAnswerDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "QuestionnaireQuestionAnswerTitleRequired")]
		public string Title { get; set; }
						
		[Required(ErrorMessage = "QuestionnaireQuestionAnswerQuestionIdRequired")]
		public Guid QuestionId { get; set; }
				public string QuestionTitle { get; set; }
				
		[Required(ErrorMessage = "QuestionnaireQuestionAnswerIsTrueRequired")]
		public bool IsTrue { get; set; }
						
		[Required(ErrorMessage = "QuestionnaireQuestionAnswerOrderRequired")]
		public int Order { get; set; }
		

	}
}