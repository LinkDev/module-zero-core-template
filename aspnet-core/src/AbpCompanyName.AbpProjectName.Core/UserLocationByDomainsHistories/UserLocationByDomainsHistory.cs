using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class UserLocationByDomainsHistory : Entity<Guid>
	{
				
		[Required]
		public Guid DomainId { get; set; }
						
		public Guid? ParentDomainId { get; set; }
						
		[Required]
		[StringLength(800)]
		public string DomainName { get; set; }
						
		[Required]
		[StringLength(50)]
		public string DomainCode { get; set; }
						
		[Required]
		public int InAreaLocationCount { get; set; }
						
		[Required]
		public int OutOfAreaLocationCount { get; set; }
						
		[Required]
		public int UnavailableAreaLocationCount { get; set; }
						
		[Required]
		public DateTime Date { get; set; }
		

	}
}