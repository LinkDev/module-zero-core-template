using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class ReportType : Entity<Guid>
	{
				
		[Required]
		[StringLength(250)]
		public string Name { get; set; }
		
		public virtual Collection<UploadedReport> UploadedReports { get; set; }

	}
}