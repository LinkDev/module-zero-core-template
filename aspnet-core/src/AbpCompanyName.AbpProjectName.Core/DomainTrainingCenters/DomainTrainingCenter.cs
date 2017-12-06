using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class DomainTrainingCenter : IEntity<Guid>
	{
				
		[Required]
		public Guid TrainingCenterId { get; set; }
						
		[Required]
		public Guid DomainId { get; set; }
		
		public virtual TrainingCenter TrainingCenter { get; set; }
		public virtual Domain Domain { get; set; }

		[NotMapped]
        public Guid Id { get { return DomainId; } set { DomainId = value; } }

        public bool IsTransient()
        {
            if (Id == new Guid())
                return true;
            else
                return false;
        }
	}
}