using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class UserApplication : IEntity<string>
	{
				
		[Required]
		public Guid ApplicationId { get; set; }
						
		[Required]
		[StringLength(128)]
		public string UserId { get; set; }
		
		public virtual Application Application { get; set; }

		[NotMapped]
        public string Id { get { return UserId; } set { UserId = value; } }

        public bool IsTransient()
        {
			if (string.IsNullOrEmpty(Id))
                return true;
            else
                return false;
        }
	}
}