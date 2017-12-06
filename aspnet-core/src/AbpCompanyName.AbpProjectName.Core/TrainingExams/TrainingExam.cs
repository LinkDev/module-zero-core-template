using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class TrainingExam : Entity<Guid>, IPassivable
	{
				
		[Required]
		[StringLength(250)]
		public string Name { get; set; }
						
		[Required]
		public Guid TrainingProgramId { get; set; }
						
		[Required]
		public bool IsActive { get; set; }
						
		[Required]
		public int Order { get; set; }
		
		public virtual TrainingProgram TrainingProgram { get; set; }
		public virtual Collection<TrainingResult> TrainingResults { get; set; }

	}
}