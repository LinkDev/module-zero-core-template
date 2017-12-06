using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class OnlineRegistrationResponse : Entity<Guid>
	{
				
		[Required]
		[StringLength(50)]
		public string NationalId { get; set; }
						
		[Required]
		[StringLength(50)]
		public string PhoneNumber { get; set; }
						
		[StringLength(50)]
		public string Code { get; set; }
						
		public Guid? UnitType { get; set; }
		

	}
}