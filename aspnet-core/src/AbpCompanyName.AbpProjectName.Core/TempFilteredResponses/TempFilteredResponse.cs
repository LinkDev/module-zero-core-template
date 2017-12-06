using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class TempFilteredResponse : Entity<Guid>
	{
				
		public Guid? ParentResponseId { get; set; }
						
		[Required]
		[StringLength(100)]
		public string Code { get; set; }
						
		[Required]
		public int RowIndex { get; set; }
		

	}
}