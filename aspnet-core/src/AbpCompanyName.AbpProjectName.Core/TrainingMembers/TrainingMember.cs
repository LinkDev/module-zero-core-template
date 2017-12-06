using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class TrainingMember : Entity<Guid>
	{
				
		[Required]
		[StringLength(200)]
		public string Name { get; set; }
						
		[Required]
		public int Age { get; set; }
						
		[Required]
		[StringLength(50)]
		public string Telephone { get; set; }
						
		[StringLength(50)]
		public string Email { get; set; }
						
		[Required]
		[StringLength(50)]
		public string NationalId { get; set; }
						
		[StringLength(500)]
		public string Address { get; set; }
						
		public DateTime? DateCreated { get; set; }
						
		[Required]
		[StringLength(128)]
		public string CreatedById { get; set; }
						
		[Required]
		public Guid TrainingCenterId { get; set; }
						
		[Required]
		public Guid TrainingProgramId { get; set; }
		
		public virtual TrainingCenter TrainingCenter { get; set; }
		public virtual TrainingProgram TrainingProgram { get; set; }
		public virtual Collection<TrainingAttendance> TrainingAttendances { get; set; }
		public virtual Collection<TrainingResult> TrainingResults { get; set; }

	}
}