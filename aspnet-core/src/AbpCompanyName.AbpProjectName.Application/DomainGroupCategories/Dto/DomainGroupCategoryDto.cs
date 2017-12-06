using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.DomainGroupCategories.Dto
{
	[AutoMap(typeof(DomainGroupCategory))]
	public class DomainGroupCategoryDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "DomainGroupCategoryNameRequired")]
		[StringLength(200,ErrorMessage="DomainGroupCategoryNameMaxLength")]
		public string Name { get; set; }
						
		[StringLength(200,ErrorMessage="DomainGroupCategoryNameEnMaxLength")]
		public string NameEn { get; set; }
						
		[Required(ErrorMessage = "DomainGroupCategoryTypeRequired")]
		public int Type { get; set; }
						
		public bool? IsAdministrative { get; set; }
		

	}
}