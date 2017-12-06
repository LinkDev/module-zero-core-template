using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.ApprovalRequests.Dto
{
	[AutoMap(typeof(ApprovalRequest))]
	public class ApprovalRequestDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "ApprovalRequestTypeRequired")]
		[StringLength(500,ErrorMessage="ApprovalRequestTypeMaxLength")]
		public string Type { get; set; }
						
		[Required(ErrorMessage = "ApprovalRequestTitleRequired")]
		[StringLength(500,ErrorMessage="ApprovalRequestTitleMaxLength")]
		public string Title { get; set; }
						
		public DateTime? DateRequested { get; set; }
						
		[StringLength(128,ErrorMessage="ApprovalRequestRequestedByMaxLength")]
		public string RequestedBy { get; set; }
						
		[Required(ErrorMessage = "ApprovalRequestContentIdRequired")]
		public Guid ContentId { get; set; }
						
		[Required(ErrorMessage = "ApprovalRequestActionRequired")]
		public string Action { get; set; }
						
		public string RouteData { get; set; }
						
		public Guid? ApprovalStepId { get; set; }
				public string ApprovalStepRoleId { get; set; }
				
		public bool? IsApproved { get; set; }
						
		public string ApprovalAction { get; set; }
						
		public string RejectionAction { get; set; }
		

	}
}