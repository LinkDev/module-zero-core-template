using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class PhaseQuestion : IEntity<Guid>
	{
				
		[Required]
		public Guid PhaseId { get; set; }
						
		[Required]
		public Guid QuestionId { get; set; }
		
		public virtual Phase Phase { get; set; }
		public virtual Question Question { get; set; }

		[NotMapped]
        public Guid Id { get { return QuestionId; } set { QuestionId = value; } }

        public bool IsTransient()
        {
            if (Id == new Guid())
                return true;
            else
                return false;
        }
	}
}