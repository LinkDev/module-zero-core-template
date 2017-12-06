using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.UserApplications.Dto
{
	[AutoMap(typeof(UserApplication))]
	public class UserApplicationDto : IEntityDto<string>
	{
				
		[Required(ErrorMessage = "UserApplicationApplicationIdRequired")]
		public Guid ApplicationId { get; set; }
				public string ApplicationName { get; set; }
				
		[Required(ErrorMessage = "UserApplicationUserIdRequired")]
		[StringLength(128,ErrorMessage="UserApplicationUserIdMaxLength")]
		public string UserId { get; set; }
		
		[NotMapped]
        public string Id { get { return UserId; } set { UserId = value; } }

	}
}