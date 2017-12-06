using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class UsersAssignment : Entity
	{
				
		[Required]
		[StringLength(100)]
		public string DomainCode { get; set; }
						
		[Required]
		[StringLength(100)]
		public string From { get; set; }
						
		[Required]
		[StringLength(100)]
		public string FromActual { get; set; }
						
		[Required]
		[StringLength(100)]
		public string To { get; set; }
						
		[Required]
		[StringLength(100)]
		public string ToActual { get; set; }
						
		[Required]
		[StringLength(10)]
		public string UserCode { get; set; }
						
		public bool? ValidInput { get; set; }
						
		[StringLength(50)]
		public string InvalidError { get; set; }
						
		public bool? ISValid { get; set; }
						
		[StringLength(128)]
		public string LastUpdatedUser { get; set; }
		

	}
}