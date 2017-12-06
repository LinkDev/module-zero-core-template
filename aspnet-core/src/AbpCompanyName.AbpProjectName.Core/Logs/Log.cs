using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class Log : Entity<Guid>
	{
				
		public int? ActionTypeId { get; set; }
						
		public DateTime? ActionDate { get; set; }
						
		[StringLength(128)]
		public string CreatedById { get; set; }
						
		[StringLength(128)]
		public string UserId { get; set; }
						
		public string DomainsIds { get; set; }
						
		public string DomainsNames { get; set; }
						
		public string Properties { get; set; }
		

	}
}