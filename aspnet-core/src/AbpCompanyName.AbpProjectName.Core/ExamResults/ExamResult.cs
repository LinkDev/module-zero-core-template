using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class ExamResult : Entity<Guid>
	{
				
		[Required]
		public Guid UserId { get; set; }
						
		[Required]
		public Guid QuestionnaireId { get; set; }
						
		[Required]
		public int Score { get; set; }
		

	}
}