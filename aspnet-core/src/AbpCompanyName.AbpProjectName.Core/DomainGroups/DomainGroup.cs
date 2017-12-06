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
						
		public Guid? SubCategoryId { get; set; }
						
		public bool? IsActive { get; set; }
						
		public DateTime? CreatedDate { get; set; }
						
		public DateTime? LastUpdateTime { get; set; }
		
		public virtual DomainGroupSubCategory SubCategory { get; set; }
		public virtual Collection<Domain> Domains { get; set; }
		public virtual Collection<Phase> BaseDomainGroupPhases { get; set; }
		public virtual Collection<Phase> DomainGroupPhases { get; set; }
		public virtual Collection<Question> Questions { get; set; }

	}
}