using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.QuestionTemplates.Dto
{
	[AutoMap(typeof(QuestionTemplate))]
	public class QuestionTemplateDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "QuestionTemplateQuestionTemplateSubCategoryIdRequired")]
		public Guid QuestionTemplateSubCategoryId { get; set; }
				public string QuestionTemplateSubCategoryName { get; set; }
				
		[Required(ErrorMessage = "QuestionTemplateNameRequired")]
		[StringLength(200,ErrorMessage="QuestionTemplateNameMaxLength")]
		public string Name { get; set; }
						
		[StringLength(200,ErrorMessage="QuestionTemplateNameEnMaxLength")]
		public string NameEn { get; set; }
						
		[Required(ErrorMessage = "QuestionTemplateTypeRequired")]
		public int Type { get; set; }
						
		[StringLength(50,ErrorMessage="QuestionTemplateCodeMaxLength")]
		public string Code { get; set; }
						
		[Required(ErrorMessage = "QuestionTemplateIsRequiredRequired")]
		public bool IsRequired { get; set; }
						
		[StringLength(500,ErrorMessage="QuestionTemplateDescriptionMaxLength")]
		public string Description { get; set; }
						
		[StringLength(500,ErrorMessage="QuestionTemplateDescriptionEnMaxLength")]
		public string DescriptionEn { get; set; }
						
		[StringLength(500,ErrorMessage="QuestionTemplateHelpMaxLength")]
		public string Help { get; set; }
						
		[StringLength(500,ErrorMessage="QuestionTemplateHelpEnMaxLength")]
		public string HelpEn { get; set; }
						
		public Guid? DomainGroupId { get; set; }
						
		public int? DomainGroupLevelsNumber { get; set; }
						
		public int? Order { get; set; }
		

	}
}