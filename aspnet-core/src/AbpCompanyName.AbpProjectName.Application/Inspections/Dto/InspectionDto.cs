using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.Inspections.Dto
{
	[AutoMap(typeof(Inspection))]
	public class InspectionDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "InspectionInspectorIdRequired")]
		[StringLength(128,ErrorMessage="InspectionInspectorIdMaxLength")]
		public string InspectorId { get; set; }
						
		[Required(ErrorMessage = "InspectionUserIdRequired")]
		[StringLength(128,ErrorMessage="InspectionUserIdMaxLength")]
		public string UserId { get; set; }
						
		public DateTime? Date { get; set; }
						
		public decimal? Rating { get; set; }
						
		public string Comments { get; set; }
						
		[Required(ErrorMessage = "InspectionPhaseIdRequired")]
		public Guid PhaseId { get; set; }
				public string PhaseName { get; set; }
				
		[Required(ErrorMessage = "InspectionDomainIdRequired")]
		public Guid DomainId { get; set; }
				public string DomainName { get; set; }


	}
}