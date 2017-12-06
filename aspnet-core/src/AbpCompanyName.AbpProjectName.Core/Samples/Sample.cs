using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class Sample : Entity<Guid>
	{
				
		[Required]
		[StringLength(128)]
		public string CreateBy { get; set; }
						
		[Required]
		[StringLength(128)]
		public string AssignedUserId { get; set; }
						
		[Required]
		public int SampleSize { get; set; }
						
		[Required]
		public DateTime SampleDate { get; set; }
						
		[Required]
		[StringLength(1000)]
		public string Properties { get; set; }
						
		[Required]
		public byte TypeOfSample { get; set; }
		
		public virtual Collection<CallBackResponse> CallBackResponses { get; set; }

	}
}