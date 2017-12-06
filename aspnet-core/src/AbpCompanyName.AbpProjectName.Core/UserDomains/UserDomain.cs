using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class UserDomain : IEntity<Guid>
	{
				
		[Required]
		[StringLength(128)]
		public string UserId { get; set; }
						
		[Required]
		public Guid DomainId { get; set; }
						
		[Required]
		public Guid ApplicationId { get; set; }
		
		public virtual Domain Domain { get; set; }
		public virtual Application Application { get; set; }

		[NotMapped]
        public Guid Id { get { return ApplicationId; } set { ApplicationId = value; } }

        public bool IsTransient()
        {
            if (Id == new Guid())
                return true;
            else
                return false;
        }
	}
}