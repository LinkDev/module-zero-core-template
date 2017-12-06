using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class ApprovalStep : Entity<Guid>, IPassivable
	{
				
		[Required]
		public Guid WorkflowId { get; set; }
						
		[Required]
		public int Order { get; set; }
						
		[StringLength(128)]
		public string RoleId { get; set; }
						
		public Guid? GroupId { get; set; }
						
		[Required]
		public bool IsActive { get; set; }
		
		public virtual Collection<ApprovalRequest> ApprovalRequests { get; set; }
		public virtual Collection<ApprovalRequestStep> ApprovalRequestSteps { get; set; }

	}
}