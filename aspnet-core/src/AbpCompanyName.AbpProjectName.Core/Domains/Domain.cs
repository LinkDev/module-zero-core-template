using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class Domain : Entity<Guid>
	{
		
		[StringLength(1000)]
		public string Name { get; set; }
		
		[StringLength(50)]
		public string Code { get; set; }
		
		public Guid? ParentDomainId { get; set; }
		
		public Guid? DomainGroupId { get; set; }
		
		public short? UR { get; set; }

		public virtual Domain ParentDomain { get; set; }
		public virtual DomainGroup DomainGroup { get; set; }
		public virtual Collection<Domain> Domains { get; set; }

	}
}