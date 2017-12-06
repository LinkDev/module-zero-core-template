using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.ApprovalRequestSteps.Dto
{
	[AutoMap(typeof(ApprovalRequestStep))]
	public class ApprovalRequestStepDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "ApprovalRequestStepApprovalRequestIdRequired")]
		public Guid ApprovalRequestId { get; set; }
				public string ApprovalRequestType { get; set; }
				
		[Required(ErrorMessage = "ApprovalRequestStepApprovalStepIdRequired")]
		public Guid ApprovalStepId { get; set; }
				public string ApprovalStepRoleId { get; set; }
				
		[Required(ErrorMessage = "ApprovalRequestStepIsApprovedRequired")]
		public bool IsApproved { get; set; }
						
		[Required(ErrorMessage = "ApprovalRequestStepDateApprovedRequired")]
		public DateTime DateApproved { get; set; }
						
		[Required(ErrorMessage = "ApprovalRequestStepApprovedByRequired")]
		[StringLength(128,ErrorMessage="ApprovalRequestStepApprovedByMaxLength")]
		public string ApprovedBy { get; set; }
						
		public string Comments { get; set; }
		

	}
}