using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class AssetType : Entity<Guid>, IPassivable
	{
				
		[Required]
		[StringLength(50)]
		public string Name { get; set; }
						
		[Required]
		public bool IsActive { get; set; }
		

	}
}