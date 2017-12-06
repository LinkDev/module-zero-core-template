using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class QuestionTemplate : Entity<Guid>
	{
				
		[Required]
		public Guid QuestionTemplateSubCategoryId { get; set; }
						
		[Required]
		[StringLength(200)]
		public string Name { get; set; }
						
		[StringLength(200)]
		public string NameEn { get; set; }
						
		[Required]
		public int Type { get; set; }
						
		[StringLength(50)]
		public string Code { get; set; }
						
		[Required]
		public bool IsRequired { get; set; }
						
		[StringLength(500)]
		public string Description { get; set; }
						
		[StringLength(500)]
		public string DescriptionEn { get; set; }
						
		[StringLength(500)]
		public string Help { get; set; }
						
		[StringLength(500)]
		public string HelpEn { get; set; }
						
		public Guid? DomainGroupId { get; set; }
						
		public int? DomainGroupLevelsNumber { get; set; }
						
		public int? Order { get; set; }
		
		public virtual QuestionTemplateSubCategory QuestionTemplateSubCategory { get; set; }
		public virtual Collection<QuestionTemplateAnswer> QuestionTemplateAnswers { get; set; }
		public virtual Collection<QuestionTemplateValidationRule> QuestionTemplateValidationRules { get; set; }

	}
}