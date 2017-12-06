using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class DomainSetting : Entity<Guid>
	{
				
		[Required]
		public Guid DomainId { get; set; }
						
		public Guid? SurveyId { get; set; }
						
		[Required]
		[StringLength(200)]
		public string Key { get; set; }
						
		[Required]
		[StringLength(500)]
		public string Value { get; set; }
		
		public virtual Domain Domain { get; set; }
		public virtual Survey Survey { get; set; }

	}
}