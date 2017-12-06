using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class Inspection : Entity<Guid>
	{
				
		[Required]
		[StringLength(128)]
		public string InspectorId { get; set; }
						
		[Required]
		[StringLength(128)]
		public string UserId { get; set; }
						
		public DateTime? Date { get; set; }
						
		public decimal? Rating { get; set; }
						
		public string Comments { get; set; }
						
		[Required]
		public Guid PhaseId { get; set; }
						
		[Required]
		public Guid DomainId { get; set; }
		
		public virtual Phase Phase { get; set; }
		public virtual Domain Domain { get; set; }

	}
}