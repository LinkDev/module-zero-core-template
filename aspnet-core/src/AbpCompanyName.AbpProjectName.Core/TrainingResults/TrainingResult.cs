using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class TrainingResult : Entity<Guid>
	{
				
		[Required]
		public Guid TrainingMemberId { get; set; }
						
		[Required]
		public Guid TrainingExamId { get; set; }
						
		[Required]
		public decimal Score { get; set; }
		
		public virtual TrainingMember TrainingMember { get; set; }
		public virtual TrainingExam TrainingExam { get; set; }

	}
}