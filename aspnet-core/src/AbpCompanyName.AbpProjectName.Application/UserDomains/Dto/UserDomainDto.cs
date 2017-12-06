using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.UserDomains.Dto
{
	[AutoMap(typeof(UserDomain))]
	public class UserDomainDto : IEntityDto<Guid>
	{
				
		[Required(ErrorMessage = "UserDomainUserIdRequired")]
		[StringLength(128,ErrorMessage="UserDomainUserIdMaxLength")]
		public string UserId { get; set; }
						
		[Required(ErrorMessage = "UserDomainDomainIdRequired")]
		public Guid DomainId { get; set; }
				public string DomainName { get; set; }
				
		[Required(ErrorMessage = "UserDomainApplicationIdRequired")]
		public Guid ApplicationId { get; set; }
				public string ApplicationName { get; set; }

		[NotMapped]
        public Guid Id { get { return ApplicationId; } set { ApplicationId = value; } }

	}
}