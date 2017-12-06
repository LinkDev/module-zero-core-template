using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class WorkingDataByUser : Entity<Guid>
	{
				
		[Required]
		[StringLength(128)]
		public string UserId { get; set; }
						
		[Required]
		[StringLength(100)]
		public string UserName { get; set; }
						
		[Required]
		[StringLength(50)]
		public string UserCode { get; set; }
						
		[Required]
		[StringLength(128)]
		public string ManagerId { get; set; }
						
		[Required]
		public int CompletedSurveys { get; set; }
						
		[Required]
		public int WorkingHours { get; set; }
						
		public DateTime? Date { get; set; }
						
		[Required]
		public Guid PhaseId { get; set; }
		

	}
}