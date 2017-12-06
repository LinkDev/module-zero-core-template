using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class ViolatedValidationRule : IEntity<Guid>
	{
				
		[Required]
		public Guid ResponseAnswerId { get; set; }
						
		[Required]
		public Guid ValidationRuleId { get; set; }
						
		[Required]
		public Guid ResponseId { get; set; }
		

		[NotMapped]
        public Guid Id { get { return ValidationRuleId; } set { ValidationRuleId = value; } }

        public bool IsTransient()
        {
            if (Id == new Guid())
                return true;
            else
                return false;
        }
	}
}