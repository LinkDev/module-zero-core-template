using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class DomainGroupCategory : Entity<Guid>
	{
				
		[Required]
		[StringLength(200)]
		public string Name { get; set; }
						
		[StringLength(200)]
		public string NameEn { get; set; }
						
		[Required]
		public int Type { get; set; }
						
		public bool? IsAdministrative { get; set; }
		
		public virtual Collection<DomainGroupSubCategory> DomainGroupSubCategories { get; set; }

	}
}