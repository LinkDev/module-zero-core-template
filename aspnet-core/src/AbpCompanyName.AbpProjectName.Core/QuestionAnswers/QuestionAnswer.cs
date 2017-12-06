using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class QuestionAnswer : Entity<Guid>, IPassivable
	{
				
		[Required]
		public string Title { get; set; }
						
		[Required]
		public bool IsActive { get; set; }
						
		[Required]
		public int Order { get; set; }
						
		[Required]
		public Guid QuestionId { get; set; }
						
		[StringLength(50)]
		public string Code { get; set; }
						
		[Required]
		public bool AllowText { get; set; }
		
		public virtual Question Question { get; set; }

	}
}