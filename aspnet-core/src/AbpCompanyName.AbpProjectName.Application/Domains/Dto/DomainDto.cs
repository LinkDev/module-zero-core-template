using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.Domains.Dto
{
	[AutoMap(typeof(Domain))]
	public class DomainDto : EntityDto<Guid>
	{
		
		[StringLength(1000)]
		public string Name { get; set; }
		
		[StringLength(50)]
		public string Code { get; set; }
		
		public Guid? ParentDomainId { get; set; }
		public string ParentDomainName { get; set; }
		
		public Guid? DomainGroupId { get; set; }
		public string DomainGroupName { get; set; }
		
		public short? UR { get; set; }


	}
}