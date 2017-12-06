using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.QuestionnaireQuestions.Dto
{
	[AutoMap(typeof(QuestionnaireQuestion))]
	public class QuestionnaireQuestionDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "QuestionnaireQuestionTitleRequired")]
		[StringLength(500,ErrorMessage="QuestionnaireQuestionTitleMaxLength")]
		public string Title { get; set; }
						
		public string Brief { get; set; }
						
		[Required(ErrorMessage = "QuestionnaireQuestionQuestionnaireIdRequired")]
		public Guid QuestionnaireId { get; set; }
				public string QuestionnaireTitle { get; set; }
				
		[Required(ErrorMessage = "QuestionnaireQuestionAnswerTypeRequired")]
		public int AnswerType { get; set; }
						
		[Required(ErrorMessage = "QuestionnaireQuestionScoreRequired")]
		public int Score { get; set; }
						
		[Required(ErrorMessage = "QuestionnaireQuestionOrderRequired")]
		public int Order { get; set; }
		

	}
}