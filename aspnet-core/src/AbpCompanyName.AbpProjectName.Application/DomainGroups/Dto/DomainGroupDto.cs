using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.DomainGroups.Dto
{
	[AutoMap(typeof(DomainGroup))]
	public class DomainGroupDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "DomainGroupNameRequired")]
		[StringLength(200,ErrorMessage="DomainGroupNameMaxLength")]
		public string Name { get; set; }
						
		public int? Type { get; set; }
						
		public Guid? SubCategoryId { get; set; }
				public string SubCategoryName { get; set; }
				
		public bool? IsActive { get; set; }
						
		public DateTime? CreatedDate { get; set; }
						
		public DateTime? LastUpdateTime { get; set; }
		

	}
}