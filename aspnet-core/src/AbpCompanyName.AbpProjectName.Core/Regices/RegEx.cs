using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class RegEx : Entity<Guid>
	{
				
		[Required]
		[StringLength(200)]
		public string Name { get; set; }
						
		[StringLength(200)]
		public string NameEn { get; set; }
						
		[Required]
		public string RegEx1 { get; set; }
						
		public Guid? CategoryId { get; set; }
		
		public virtual RegExCategory Category { get; set; }

	}
}