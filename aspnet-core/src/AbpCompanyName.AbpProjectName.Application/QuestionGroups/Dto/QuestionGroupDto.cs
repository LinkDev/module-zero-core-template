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
				
		[StringLength(200,ErrorMessage="QuestionGroupNameMaxLength")]
		public string Name { get; set; }
						
		[Required(ErrorMessage = "QuestionGroupIsActiveRequired")]
		public bool IsActive { get; set; }
						
		[Required(ErrorMessage = "QuestionGroupOrderRequired")]
		public int Order { get; set; }
						
		[Required(ErrorMessage = "QuestionGroupSurveyIdRequired")]
		public Guid SurveyId { get; set; }
				public string SurveyName { get; set; }
				
		[StringLength(50,ErrorMessage="QuestionGroupCodeMaxLength")]
		public string Code { get; set; }
						
		public string Description { get; set; }
						
		public string DescriptionEnglish { get; set; }
		

	}
}