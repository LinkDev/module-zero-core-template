using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class UploadedReport : Entity<Guid>
	{
				
		[Required]
		[StringLength(250)]
		public string Name { get; set; }
						
		[Required]
		public Guid ReportTypeId { get; set; }
						
		public Guid? DomainId { get; set; }
						
		public decimal? Rating { get; set; }
						
		[Required]
		[StringLength(500)]
		public string File { get; set; }
						
		public DateTime? CreatedDate { get; set; }
						
		[Required]
		[StringLength(128)]
		public string CreatedBy { get; set; }
						
		[Required]
		public Guid PhaseId { get; set; }
		
		public virtual ReportType ReportType { get; set; }
		public virtual Domain Domain { get; set; }
		public virtual Phase Phase { get; set; }
		public virtual Collection<UploadedReportRole> UploadedReportRoles { get; set; }

	}
}