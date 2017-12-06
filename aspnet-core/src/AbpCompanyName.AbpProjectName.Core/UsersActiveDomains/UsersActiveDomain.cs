using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class UsersActiveDomain : IEntity<Guid>
	{
				
		[Required]
		[StringLength(128)]
		public string UserId { get; set; }
						
		[Required]
		public Guid ActiveDomainId { get; set; }
		

		[NotMapped]
        public Guid Id { get { return ActiveDomainId; } set { ActiveDomainId = value; } }

        public bool IsTransient()
        {
            if (Id == new Guid())
                return true;
            else
                return false;
        }
	}
}