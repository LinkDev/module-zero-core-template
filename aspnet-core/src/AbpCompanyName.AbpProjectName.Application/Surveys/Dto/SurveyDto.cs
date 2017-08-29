using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.Surveys.Dto
{
	[AutoMap(typeof(Survey))]
	public class SurveyDto : EntityDto<Guid>
	{
		
		[Required]
		[StringLength(200)]
		public string Name { get; set; }
		
		[Required]
		public bool IsActive { get; set; }
		
		public Guid? ParentSurveyId { get; set; }
		public string ParentSurveyName { get; set; }
		
		public int? ParentSurveyRelation { get; set; }
		
		[Required]
		public bool IsEnabled { get; set; }
		
		[StringLength(50)]
		public string Code { get; set; }
		
		[StringLength(200)]
		public string Icon { get; set; }
		
		[Required]
		public bool AllowAddResponse { get; set; }
		
		[StringLength(50)]
		public string TypeText { get; set; }
		
		public int? SerialDigitsCount { get; set; }
		
		public DateTime? LastUpdateTime { get; set; }
		
		public Guid? MappedToSurveyId { get; set; }
		
		public int? MinMinutes { get; set; }
		
		public int? DailyTarget { get; set; }


	}
}