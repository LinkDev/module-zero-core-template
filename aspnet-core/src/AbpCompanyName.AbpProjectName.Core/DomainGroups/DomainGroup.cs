using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class DomainGroup : Entity<Guid>
	{
		
		[Required]
		[StringLength(200)]
		public string Name { get; set; }
		
		public int? Type { get; set; }
		
		public bool? IsActive { get; set; }
		
		[Required]
		public DateTime CreatedDate { get; set; }
		
		public DateTime? LastUpdateTime { get; set; }

		public virtual Collection<Domain> Domains { get; set; }
		public virtual Collection<Question> Questions { get; set; }

	}
}