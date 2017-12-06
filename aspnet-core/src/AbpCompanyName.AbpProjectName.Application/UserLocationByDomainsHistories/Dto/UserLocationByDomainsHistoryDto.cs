using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.UserLocationByDomainsHistories.Dto
{
	[AutoMap(typeof(UserLocationByDomainsHistory))]
	public class UserLocationByDomainsHistoryDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "UserLocationByDomainsHistoryDomainIdRequired")]
		public Guid DomainId { get; set; }
						
		public Guid? ParentDomainId { get; set; }
						
		[Required(ErrorMessage = "UserLocationByDomainsHistoryDomainNameRequired")]
		[StringLength(800,ErrorMessage="UserLocationByDomainsHistoryDomainNameMaxLength")]
		public string DomainName { get; set; }
						
		[Required(ErrorMessage = "UserLocationByDomainsHistoryDomainCodeRequired")]
		[StringLength(50,ErrorMessage="UserLocationByDomainsHistoryDomainCodeMaxLength")]
		public string DomainCode { get; set; }
						
		[Required(ErrorMessage = "UserLocationByDomainsHistoryInAreaLocationCountRequired")]
		public int InAreaLocationCount { get; set; }
						
		[Required(ErrorMessage = "UserLocationByDomainsHistoryOutOfAreaLocationCountRequired")]
		public int OutOfAreaLocationCount { get; set; }
						
		[Required(ErrorMessage = "UserLocationByDomainsHistoryUnavailableAreaLocationCountRequired")]
		public int UnavailableAreaLocationCount { get; set; }
						
		[Required(ErrorMessage = "UserLocationByDomainsHistoryDateRequired")]
		public DateTime Date { get; set; }
		

	}
}