using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class QuestionTemplateSubCategory : Entity<Guid>
	{
				
		[Required]
		public Guid QuestionTemplateCategoryId { get; set; }
						
		[Required]
		[StringLength(200)]
		public string Name { get; set; }
						
		[StringLength(200)]
		public string NameEn { get; set; }
		
		public virtual QuestionTemplateCategory QuestionTemplateCategory { get; set; }
		public virtual Collection<QuestionTemplate> QuestionTemplates { get; set; }

	}
}