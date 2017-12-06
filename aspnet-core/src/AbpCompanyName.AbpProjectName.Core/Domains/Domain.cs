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
				
		[StringLength(2000)]
		public string Name { get; set; }
						
		[StringLength(50)]
		public string Code { get; set; }
						
		public Guid? ParentDomainId { get; set; }
						
		public Guid? DomainGroupId { get; set; }
						
		public int? UR { get; set; }
						
		[StringLength(500)]
		public string NameHierachy { get; set; }
		
		public virtual Domain ParentDomain { get; set; }
		public virtual DomainGroup DomainGroup { get; set; }
		public virtual Collection<Announcement> Announcements { get; set; }
		public virtual Collection<CallBackResponse> CallBackResponses { get; set; }
		public virtual Collection<Domain> Domains { get; set; }
		public virtual Collection<DomainSetting> DomainSettings { get; set; }
		public virtual Collection<DomainTrainingCenter> DomainTrainingCenters { get; set; }
		public virtual Collection<Inspection> Inspections { get; set; }
		public virtual Collection<UploadedReport> UploadedReports { get; set; }
		public virtual Collection<UserDomain> UserDomains { get; set; }

	}
}