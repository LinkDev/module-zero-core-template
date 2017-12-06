using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.QualityCallBackResponseAnswers.Dto
{
	[AutoMap(typeof(QualityCallBackResponseAnswer))]
	public class QualityCallBackResponseAnswerDto : EntityDto
	{
				
		[Required(ErrorMessage = "QualityCallBackResponseAnswerResponseAnswerIdRequired")]
		public Guid ResponseAnswerId { get; set; }
						
		[Required(ErrorMessage = "QualityCallBackResponseAnswerQuestionIdRequired")]
		public Guid QuestionId { get; set; }
						
		public Guid? QuestionAnswerId { get; set; }
						
		[StringLength(800,ErrorMessage="QualityCallBackResponseAnswerAnswerValueMaxLength")]
		public string AnswerValue { get; set; }
						
		public decimal? AnswerNumber { get; set; }
						
		public DateTime? AnswerTime { get; set; }
						
		public Guid? ResponseId { get; set; }
						
		public int? Status { get; set; }
		

	}
}