using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.UserProfilesProgresses.Dto
{
	[AutoMap(typeof(UserProfilesProgress))]
	public class UserProfilesProgressDto : EntityDto<Guid>
	{
				
		[StringLength(128,ErrorMessage="UserProfilesProgressUserProfileIdMaxLength")]
		public string UserProfileId { get; set; }
						
		public bool? IsActive { get; set; }
						
		[Required(ErrorMessage = "UserProfilesProgressUserIdRequired")]
		[StringLength(128,ErrorMessage="UserProfilesProgressUserIdMaxLength")]
		public string UserId { get; set; }
						
		[Required(ErrorMessage = "UserProfilesProgressUserNameRequired")]
		[StringLength(250,ErrorMessage="UserProfilesProgressUserNameMaxLength")]
		public string UserName { get; set; }
						
		[Required(ErrorMessage = "UserProfilesProgressUserCodeRequired")]
		[StringLength(50,ErrorMessage="UserProfilesProgressUserCodeMaxLength")]
		public string UserCode { get; set; }
						
		[StringLength(128,ErrorMessage="UserProfilesProgressManagerIdMaxLength")]
		public string ManagerId { get; set; }
						
		[Required(ErrorMessage = "UserProfilesProgressSurveyIdRequired")]
		public Guid SurveyId { get; set; }
						
		[Required(ErrorMessage = "UserProfilesProgressCountRequired")]
		public int Count { get; set; }
						
		public Guid? CreationPhaseId { get; set; }
		

	}
}