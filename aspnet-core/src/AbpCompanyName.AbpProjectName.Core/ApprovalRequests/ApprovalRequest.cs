using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class ApprovalRequest : Entity<Guid>
	{
				
		[Required]
		[StringLength(500)]
		public string Type { get; set; }
						
		[Required]
		[StringLength(500)]
		public string Title { get; set; }
						
		public DateTime? DateRequested { get; set; }
						
		[StringLength(128)]
		public string RequestedBy { get; set; }
						
		[Required]
		public Guid ContentId { get; set; }
						
		[Required]
		public string Action { get; set; }
						
		public string RouteData { get; set; }
						
		public Guid? ApprovalStepId { get; set; }
						
		public bool? IsApproved { get; set; }
						
		public string ApprovalAction { get; set; }
						
		public string RejectionAction { get; set; }
		
		public virtual ApprovalStep ApprovalStep { get; set; }
		public virtual Collection<ApprovalRequestStep> ApprovalRequestSteps { get; set; }

	}
}