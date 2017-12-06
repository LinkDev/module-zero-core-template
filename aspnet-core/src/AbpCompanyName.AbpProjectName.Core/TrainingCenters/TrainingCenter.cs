using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class TrainingCenter : Entity<Guid>, IPassivable
	{
				
		[Required]
		[StringLength(200)]
		public string Name { get; set; }
						
		[Required]
		public bool IsActive { get; set; }
		
		public virtual Collection<DomainTrainingCenter> DomainTrainingCenters { get; set; }
		public virtual Collection<TrainingCenterUser> TrainingCenterUsers { get; set; }
		public virtual Collection<TrainingMember> TrainingMembers { get; set; }

	}
}