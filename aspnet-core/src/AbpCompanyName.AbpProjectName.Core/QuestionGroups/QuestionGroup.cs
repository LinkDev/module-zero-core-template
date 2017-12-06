using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class QuestionGroup : Entity<Guid>, IPassivable
	{
				
		[StringLength(200)]
		public string Name { get; set; }
						
		[Required]
		public bool IsActive { get; set; }
						
		[Required]
		public int Order { get; set; }
						
		[Required]
		public Guid SurveyId { get; set; }
						
		[StringLength(50)]
		public string Code { get; set; }
						
		public string Description { get; set; }
						
		public string DescriptionEnglish { get; set; }
		
		public virtual Survey Survey { get; set; }
		public virtual Collection<Comment> Comments { get; set; }
		public virtual Collection<Question> Questions { get; set; }

	}
}