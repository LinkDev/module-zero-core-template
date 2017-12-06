using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.DomainGroupSubCategories.Dto
{
	[AutoMap(typeof(DomainGroupSubCategory))]
	public class DomainGroupSubCategoryDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "DomainGroupSubCategoryNameRequired")]
		[StringLength(200,ErrorMessage="DomainGroupSubCategoryNameMaxLength")]
		public string Name { get; set; }
						
		[StringLength(200,ErrorMessage="DomainGroupSubCategoryNameEnMaxLength")]
		public string NameEn { get; set; }
						
		[Required(ErrorMessage = "DomainGroupSubCategoryDomainGroupCategoryIdRequired")]
		public Guid DomainGroupCategoryId { get; set; }
				public string DomainGroupCategoryName { get; set; }


	}
}