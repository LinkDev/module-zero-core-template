using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.UploadedReportRoles.Dto
{
	[AutoMap(typeof(UploadedReportRole))]
	public class UploadedReportRoleDto : IEntityDto<string>
	{
				
		[Required(ErrorMessage = "UploadedReportRoleUploadedReportIdRequired")]
		public Guid UploadedReportId { get; set; }
				public string UploadedReportName { get; set; }
				
		[Required(ErrorMessage = "UploadedReportRoleRoleIdRequired")]
		[StringLength(128,ErrorMessage="UploadedReportRoleRoleIdMaxLength")]
		public string RoleId { get; set; }
		
		[NotMapped]
        public string Id { get { return RoleId; } set { RoleId = value; } }

	}
}