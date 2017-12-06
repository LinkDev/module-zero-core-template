using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.UsersActiveDomains.Dto
{
	[AutoMap(typeof(UsersActiveDomain))]
	public class UsersActiveDomainDto : IEntityDto<Guid>
	{
				
		[Required(ErrorMessage = "UsersActiveDomainUserIdRequired")]
		[StringLength(128,ErrorMessage="UsersActiveDomainUserIdMaxLength")]
		public string UserId { get; set; }
						
		[Required(ErrorMessage = "UsersActiveDomainActiveDomainIdRequired")]
		public Guid ActiveDomainId { get; set; }
		
		[NotMapped]
        public Guid Id { get { return ActiveDomainId; } set { ActiveDomainId = value; } }

	}
}