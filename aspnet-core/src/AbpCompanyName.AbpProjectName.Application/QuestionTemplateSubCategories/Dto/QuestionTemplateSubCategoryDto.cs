using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.QuestionTemplateSubCategories.Dto
{
	[AutoMap(typeof(QuestionTemplateSubCategory))]
	public class QuestionTemplateSubCategoryDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "QuestionTemplateSubCategoryQuestionTemplateCategoryIdRequired")]
		public Guid QuestionTemplateCategoryId { get; set; }
				public string QuestionTemplateCategoryName { get; set; }
				
		[Required(ErrorMessage = "QuestionTemplateSubCategoryNameRequired")]
		[StringLength(200,ErrorMessage="QuestionTemplateSubCategoryNameMaxLength")]
		public string Name { get; set; }
						
		[StringLength(200,ErrorMessage="QuestionTemplateSubCategoryNameEnMaxLength")]
		public string NameEn { get; set; }
		

	}
}