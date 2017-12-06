using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.SyncLogs.Dto
{
	[AutoMap(typeof(SyncLog))]
	public class SyncLogDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "SyncLogStatusRequired")]
		public int Status { get; set; }
						
		public DateTime? Time { get; set; }
						
		[Required(ErrorMessage = "SyncLogIsServerRequired")]
		public bool IsServer { get; set; }
						
		[Required(ErrorMessage = "SyncLogCountRequired")]
		public int Count { get; set; }
						
		[Required(ErrorMessage = "SyncLogUserIdRequired")]
		[StringLength(128,ErrorMessage="SyncLogUserIdMaxLength")]
		public string UserId { get; set; }
						
		public string Message { get; set; }
						
		[StringLength(128,ErrorMessage="SyncLogServiceMaxLength")]
		public string Service { get; set; }
						
		[StringLength(50,ErrorMessage="SyncLogDomainCodeMaxLength")]
		public string DomainCode { get; set; }
						
		public string ArabicErrorDescription { get; set; }
		

	}
}