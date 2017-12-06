using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.Logs.Dto
{
	[AutoMap(typeof(Log))]
	public class LogDto : EntityDto<Guid>
	{
				
		public int? ActionTypeId { get; set; }
						
		public DateTime? ActionDate { get; set; }
						
		[StringLength(128,ErrorMessage="LogCreatedByIdMaxLength")]
		public string CreatedById { get; set; }
						
		[StringLength(128,ErrorMessage="LogUserIdMaxLength")]
		public string UserId { get; set; }
						
		public string DomainsIds { get; set; }
						
		public string DomainsNames { get; set; }
						
		public string Properties { get; set; }
		

	}
}