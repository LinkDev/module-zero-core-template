using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.RegExCategories.Dto
{
	[AutoMap(typeof(RegExCategory))]
	public class RegExCategoryDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "RegExCategoryNameRequired")]
		[StringLength(200,ErrorMessage="RegExCategoryNameMaxLength")]
		public string Name { get; set; }
						
		[StringLength(200,ErrorMessage="RegExCategoryNameEnMaxLength")]
		public string NameEn { get; set; }
		

	}
}