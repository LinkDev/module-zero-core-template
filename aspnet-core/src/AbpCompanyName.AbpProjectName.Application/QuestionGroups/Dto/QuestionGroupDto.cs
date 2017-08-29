using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.QuestionGroups.Dto
{
	[AutoMap(typeof(QuestionGroup))]
	public class QuestionGroupDto : EntityDto<Guid>
	{
		
		[StringLength(200)]
		public string Name { get; set; }
		
		[Required]
		public bool IsActive { get; set; }
		
		[Required]
		public int Order { get; set; }
		
		[Required]
		public Guid SurveyId { get; set; }
		public string SurveyName { get; set; }
		
		[StringLength(50)]
		public string Code { get; set; }


	}
}