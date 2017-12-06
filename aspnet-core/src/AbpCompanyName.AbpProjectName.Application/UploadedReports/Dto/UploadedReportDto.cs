using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.UploadedReports.Dto
{
	[AutoMap(typeof(UploadedReport))]
	public class UploadedReportDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "UploadedReportNameRequired")]
		[StringLength(250,ErrorMessage="UploadedReportNameMaxLength")]
		public string Name { get; set; }
						
		[Required(ErrorMessage = "UploadedReportReportTypeIdRequired")]
		public Guid ReportTypeId { get; set; }
				public string ReportTypeName { get; set; }
				
		public Guid? DomainId { get; set; }
				public string DomainName { get; set; }
				
		public decimal? Rating { get; set; }
						
		[Required(ErrorMessage = "UploadedReportFileRequired")]
		[StringLength(500,ErrorMessage="UploadedReportFileMaxLength")]
		public string File { get; set; }
						
		public DateTime? CreatedDate { get; set; }
						
		[Required(ErrorMessage = "UploadedReportCreatedByRequired")]
		[StringLength(128,ErrorMessage="UploadedReportCreatedByMaxLength")]
		public string CreatedBy { get; set; }
						
		[Required(ErrorMessage = "UploadedReportPhaseIdRequired")]
		public Guid PhaseId { get; set; }
				public string PhaseName { get; set; }


	}
}