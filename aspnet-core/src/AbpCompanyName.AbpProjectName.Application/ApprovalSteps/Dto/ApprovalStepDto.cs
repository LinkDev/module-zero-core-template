using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.ApprovalSteps.Dto
{
	[AutoMap(typeof(ApprovalStep))]
	public class ApprovalStepDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "ApprovalStepWorkflowIdRequired")]
		public Guid WorkflowId { get; set; }
						
		[Required(ErrorMessage = "ApprovalStepOrderRequired")]
		public int Order { get; set; }
						
		[StringLength(128,ErrorMessage="ApprovalStepRoleIdMaxLength")]
		public string RoleId { get; set; }
						
		public Guid? GroupId { get; set; }
						
		[Required(ErrorMessage = "ApprovalStepIsActiveRequired")]
		public bool IsActive { get; set; }
		

	}
}