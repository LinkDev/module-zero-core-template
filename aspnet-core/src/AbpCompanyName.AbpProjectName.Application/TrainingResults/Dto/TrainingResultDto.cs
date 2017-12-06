using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.TrainingResults.Dto
{
	[AutoMap(typeof(TrainingResult))]
	public class TrainingResultDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "TrainingResultTrainingMemberIdRequired")]
		public Guid TrainingMemberId { get; set; }
				public string TrainingMemberName { get; set; }
				
		[Required(ErrorMessage = "TrainingResultTrainingExamIdRequired")]
		public Guid TrainingExamId { get; set; }
				public string TrainingExamName { get; set; }
				
		[Required(ErrorMessage = "TrainingResultScoreRequired")]
		public decimal Score { get; set; }
		

	}
}