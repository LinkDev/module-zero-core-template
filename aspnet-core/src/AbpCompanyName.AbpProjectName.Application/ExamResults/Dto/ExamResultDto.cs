using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.ExamResults.Dto
{
	[AutoMap(typeof(ExamResult))]
	public class ExamResultDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "ExamResultUserIdRequired")]
		public Guid UserId { get; set; }
						
		[Required(ErrorMessage = "ExamResultQuestionnaireIdRequired")]
		public Guid QuestionnaireId { get; set; }
						
		[Required(ErrorMessage = "ExamResultScoreRequired")]
		public int Score { get; set; }
		

	}
}