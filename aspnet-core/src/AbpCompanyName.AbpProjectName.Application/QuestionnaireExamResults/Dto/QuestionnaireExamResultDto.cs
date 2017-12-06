using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.QuestionnaireExamResults.Dto
{
	[AutoMap(typeof(QuestionnaireExamResult))]
	public class QuestionnaireExamResultDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "QuestionnaireExamResultUserIdRequired")]
		[StringLength(244,ErrorMessage="QuestionnaireExamResultUserIdMaxLength")]
		public string UserId { get; set; }
						
		[Required(ErrorMessage = "QuestionnaireExamResultQuestionnaireIdRequired")]
		public Guid QuestionnaireId { get; set; }
				public string QuestionnaireTitle { get; set; }
				
		[Required(ErrorMessage = "QuestionnaireExamResultUserScoreRequired")]
		public int UserScore { get; set; }
						
		[Required(ErrorMessage = "QuestionnaireExamResultTotalScoreRequired")]
		public int TotalScore { get; set; }
						
		[Required(ErrorMessage = "QuestionnaireExamResultSubmitDateRequired")]
		public DateTime SubmitDate { get; set; }
		

	}
}