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
				
		[StringLength(2000,ErrorMessage="DomainNameMaxLength")]
		public string Name { get; set; }
						
		[StringLength(50,ErrorMessage="DomainCodeMaxLength")]
		public string Code { get; set; }
						
		public Guid? ParentDomainId { get; set; }
				public string ParentDomainName { get; set; }
				
		public Guid? DomainGroupId { get; set; }
				public string DomainGroupName { get; set; }
				
		public int? UR { get; set; }
						
		[StringLength(500,ErrorMessage="DomainNameHierachyMaxLength")]
		public string NameHierachy { get; set; }
		

	}
}