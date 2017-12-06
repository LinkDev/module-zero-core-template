using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class LocationTracking : Entity<Guid>
	{
				
		[Required]
		[StringLength(128)]
		public string ObjectId { get; set; }
						
		public DateTime? Time { get; set; }
								
		public bool? IsInArea { get; set; }
						
		[Required]
		public bool IsLast { get; set; }
		

	}
}