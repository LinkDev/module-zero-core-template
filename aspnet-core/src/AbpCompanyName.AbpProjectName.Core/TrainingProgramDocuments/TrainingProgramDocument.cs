using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class TrainingProgramDocument : Entity<Guid>
	{
				
		[Required]
		public Guid TrainingProgramId { get; set; }
						
		[Required]
		[StringLength(250)]
		public string Name { get; set; }
						
		[Required]
		[StringLength(500)]
		public string File { get; set; }
		
		public virtual TrainingProgram TrainingProgram { get; set; }

	}
}