using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.UserLocationByDomains.Dto
{
	[AutoMap(typeof(UserLocationByDomain))]
	public class UserLocationByDomainDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "UserLocationByDomainDomainIdRequired")]
		public Guid DomainId { get; set; }
						
		public Guid? ParentDomainId { get; set; }
						
		[Required(ErrorMessage = "UserLocationByDomainDomainNameRequired")]
		[StringLength(800,ErrorMessage="UserLocationByDomainDomainNameMaxLength")]
		public string DomainName { get; set; }
						
		[Required(ErrorMessage = "UserLocationByDomainDomainCodeRequired")]
		[StringLength(50,ErrorMessage="UserLocationByDomainDomainCodeMaxLength")]
		public string DomainCode { get; set; }
						
		[Required(ErrorMessage = "UserLocationByDomainInAreaLocationCountRequired")]
		public int InAreaLocationCount { get; set; }
						
		[Required(ErrorMessage = "UserLocationByDomainOutOfAreaLocationCountRequired")]
		public int OutOfAreaLocationCount { get; set; }
						
		[Required(ErrorMessage = "UserLocationByDomainUnavailableAreaLocationCountRequired")]
		public int UnavailableAreaLocationCount { get; set; }
		

	}
}