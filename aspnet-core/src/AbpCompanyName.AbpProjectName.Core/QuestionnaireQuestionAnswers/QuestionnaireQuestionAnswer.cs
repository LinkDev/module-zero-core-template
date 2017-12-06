using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class QuestionnaireQuestionAnswer : Entity<Guid>
	{
				
		[Required]
		public string Title { get; set; }
						
		[Required]
		public Guid QuestionId { get; set; }
						
		[Required]
		public bool IsTrue { get; set; }
						
		[Required]
		public int Order { get; set; }
		
		public virtual QuestionnaireQuestion Question { get; set; }

	}
}