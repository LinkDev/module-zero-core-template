using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class TrainingAttendance : Entity<Guid>
	{
				
		public DateTime? Time { get; set; }
						
		public Guid? TrainingMemberId { get; set; }
						
		public Guid? TrainingProgramId { get; set; }
		
		public virtual TrainingMember TrainingMember { get; set; }
		public virtual TrainingProgram TrainingProgram { get; set; }

	}
}