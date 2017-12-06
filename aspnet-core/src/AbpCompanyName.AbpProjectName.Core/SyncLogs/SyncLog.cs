using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class SyncLog : Entity<Guid>
	{
				
		[Required]
		public int Status { get; set; }
						
		public DateTime? Time { get; set; }
						
		[Required]
		public bool IsServer { get; set; }
						
		[Required]
		public int Count { get; set; }
						
		[Required]
		[StringLength(128)]
		public string UserId { get; set; }
						
		public string Message { get; set; }
						
		[StringLength(128)]
		public string Service { get; set; }
						
		[StringLength(50)]
		public string DomainCode { get; set; }
						
		public string ArabicErrorDescription { get; set; }
		

	}
}