using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class QuestionTemplateAnswer : Entity<Guid>
	{
				
		[Required]
		public Guid QuestionTemplateId { get; set; }
						
		[Required]
		[StringLength(200)]
		public string Name { get; set; }
						
		[StringLength(200)]
		public string NameEn { get; set; }
						
		[StringLength(50)]
		public string Code { get; set; }
						
		public int? Order { get; set; }
		
		public virtual QuestionTemplate QuestionTemplate { get; set; }

	}
}