using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class ApprovalRequestStep : Entity<Guid>
	{
				
		[Required]
		public Guid ApprovalRequestId { get; set; }
						
		[Required]
		public Guid ApprovalStepId { get; set; }
						
		[Required]
		public bool IsApproved { get; set; }
						
		[Required]
		public DateTime DateApproved { get; set; }
						
		[Required]
		[StringLength(128)]
		public string ApprovedBy { get; set; }
						
		public string Comments { get; set; }
		
		public virtual ApprovalRequest ApprovalRequest { get; set; }
		public virtual ApprovalStep ApprovalStep { get; set; }

	}
}