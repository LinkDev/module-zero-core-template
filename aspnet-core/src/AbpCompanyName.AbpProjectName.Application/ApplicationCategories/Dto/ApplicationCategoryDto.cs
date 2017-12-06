using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.ApplicationCategories.Dto
{
	[AutoMap(typeof(ApplicationCategory))]
	public class ApplicationCategoryDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "ApplicationCategoryNameRequired")]
		[StringLength(200,ErrorMessage="ApplicationCategoryNameMaxLength")]
		public string Name { get; set; }
						
		[StringLength(200,ErrorMessage="ApplicationCategoryNameEnMaxLength")]
		public string NameEn { get; set; }
		

	}
}