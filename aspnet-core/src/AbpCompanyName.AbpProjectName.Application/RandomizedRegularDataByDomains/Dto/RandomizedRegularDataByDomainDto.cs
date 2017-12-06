using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.RandomizedRegularDataByDomains.Dto
{
	[AutoMap(typeof(RandomizedRegularDataByDomain))]
	public class RandomizedRegularDataByDomainDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "RandomizedRegularDataByDomainDomainCodeRequired")]
		[StringLength(50,ErrorMessage="RandomizedRegularDataByDomainDomainCodeMaxLength")]
		public string DomainCode { get; set; }
						
		[Required(ErrorMessage = "RandomizedRegularDataByDomainPersonsCountRequired")]
		public long PersonsCount { get; set; }
						
		[Required(ErrorMessage = "RandomizedRegularDataByDomainSampleIntervalRequired")]
		public int SampleInterval { get; set; }
		

	}
}