using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.UserSurveysTemplates.Dto
{
	[AutoMap(typeof(UserSurveysTemplate))]
	public class UserSurveysTemplateDto : IEntityDto<string>
	{
				
		[Required(ErrorMessage = "UserSurveysTemplateSurveyIdRequired")]
		public Guid SurveyId { get; set; }
				public string SurveyName { get; set; }
				
		[Required(ErrorMessage = "UserSurveysTemplateUserIdRequired")]
		[StringLength(128,ErrorMessage="UserSurveysTemplateUserIdMaxLength")]
		public string UserId { get; set; }
		
		[NotMapped]
        public string Id { get { return UserId; } set { UserId = value; } }

	}
}