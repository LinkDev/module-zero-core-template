using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class DomainGroupSubCategory : Entity<Guid>
	{
				
		[Required]
		[StringLength(200)]
		public string Name { get; set; }
						
		[StringLength(200)]
		public string NameEn { get; set; }
						
		[Required]
		public Guid DomainGroupCategoryId { get; set; }
		
		public virtual DomainGroupCategory DomainGroupCategory { get; set; }
		public virtual Collection<DomainGroup> DomainGroups { get; set; }

	}
}