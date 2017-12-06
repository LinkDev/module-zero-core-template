using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class RandomizedRegularDataByDomain : Entity<Guid>
	{
				
		[Required]
		[StringLength(50)]
		public string DomainCode { get; set; }
						
		[Required]
		public long PersonsCount { get; set; }
						
		[Required]
		public int SampleInterval { get; set; }
		

	}
}