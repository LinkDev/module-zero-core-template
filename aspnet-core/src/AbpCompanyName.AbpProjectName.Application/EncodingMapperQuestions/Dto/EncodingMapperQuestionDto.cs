using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.EncodingMapperQuestions.Dto
{
	[AutoMap(typeof(EncodingMapperQuestion))]
	public class EncodingMapperQuestionDto : EntityDto
	{
				
		[Required(ErrorMessage = "EncodingMapperQuestionCollectorQuestionIdRequired")]
		public Guid CollectorQuestionId { get; set; }
						
		[Required(ErrorMessage = "EncodingMapperQuestionEncoderQuestionIdRequired")]
		public Guid EncoderQuestionId { get; set; }
						
		[Required(ErrorMessage = "EncodingMapperQuestionReviewerQuestionIdRequired")]
		public Guid ReviewerQuestionId { get; set; }
						
		[Required(ErrorMessage = "EncodingMapperQuestionCollectorDetailsQuestionIdRequired")]
		public Guid CollectorDetailsQuestionId { get; set; }
		

	}
}