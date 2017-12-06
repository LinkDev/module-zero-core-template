using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.QuestionTemplateCategories.Dto
{
	[AutoMap(typeof(QuestionTemplateCategory))]
	public class QuestionTemplateCategoryDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "QuestionTemplateCategoryNameRequired")]
		[StringLength(200,ErrorMessage="QuestionTemplateCategoryNameMaxLength")]
		public string Name { get; set; }
						
		[StringLength(200,ErrorMessage="QuestionTemplateCategoryNameEnMaxLength")]
		public string NameEn { get; set; }
		

	}
}