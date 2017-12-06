using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class TrainingProgram : Entity<Guid>, IPassivable
	{
				
		[Required]
		[StringLength(200)]
		public string Name { get; set; }
						
		public DateTime? From { get; set; }
						
		public DateTime? To { get; set; }
						
		[Required]
		public Guid PhaseId { get; set; }
						
		[Required]
		public bool IsActive { get; set; }
						
		[StringLength(200)]
		public string AttendanceTime { get; set; }
						
		[StringLength(128)]
		public string RoleId { get; set; }
		
		public virtual Phase Phase { get; set; }
		public virtual Collection<TrainingAttendance> TrainingAttendances { get; set; }
		public virtual Collection<TrainingExam> TrainingExams { get; set; }
		public virtual Collection<TrainingMember> TrainingMembers { get; set; }
		public virtual Collection<TrainingProgramDocument> TrainingProgramDocuments { get; set; }

	}
}