using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class RandomizedRegularDatum : Entity
	{
				
		[Required]
		public int MinRange { get; set; }
						
		[Required]
		public long MaxRange { get; set; }
						
		[Required]
		public decimal Percentage { get; set; }
						
		[Required]
		public int Interval { get; set; }
		

	}
}