using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class QuestionAttachment : Entity<Guid>
	{
				
		[StringLength(255)]
		public string Name { get; set; }
						
		public string Description { get; set; }
						
		[Required]
		[StringLength(500)]
		public string Path { get; set; }
						
		[Required]
		public int Order { get; set; }
						
		[Required]
		public Guid QuestionId { get; set; }
						
		[Required]
		public int Type { get; set; }
		
		public virtual Question Question { get; set; }

	}
}