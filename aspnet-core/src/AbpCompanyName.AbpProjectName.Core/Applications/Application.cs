using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class Application : Entity<Guid>, IPassivable
	{
				
		[Required]
		[StringLength(200)]
		public string Name { get; set; }
						
		public Guid? CurrentPhaseId { get; set; }
						
		public bool? IsEnabled { get; set; }
						
		[Required]
		public bool IsActive { get; set; }
						
		[StringLength(500)]
		public string Logo { get; set; }
						
		public Guid? CategoryId { get; set; }
						
		public int? AvailableFor { get; set; }
		
		public virtual Phase CurrentPhase { get; set; }
		public virtual ApplicationCategory Category { get; set; }
		public virtual Collection<Phase> Phases { get; set; }
		public virtual Collection<UserApplication> UserApplications { get; set; }
		public virtual Collection<UserDomain> UserDomains { get; set; }

	}
}