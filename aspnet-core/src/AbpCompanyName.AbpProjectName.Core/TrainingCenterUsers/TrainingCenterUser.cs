using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class TrainingCenterUser : IEntity<Guid>
	{
				
		[Required]
		[StringLength(128)]
		public string UserId { get; set; }
						
		[Required]
		public Guid TrainingCenterId { get; set; }
		
		public virtual TrainingCenter TrainingCenter { get; set; }

		[NotMapped]
        public Guid Id { get { return TrainingCenterId; } set { TrainingCenterId = value; } }

        public bool IsTransient()
        {
            if (Id == new Guid())
                return true;
            else
                return false;
        }
	}
}