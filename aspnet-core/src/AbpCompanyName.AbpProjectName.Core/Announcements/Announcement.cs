using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class Announcement : Entity<Guid>
	{
				
		[Required]
		[StringLength(4000)]
		public string Message { get; set; }
						
		public Guid? DomainId { get; set; }
						
		public DateTime? Date { get; set; }
						
		[StringLength(128)]
		public string SenderId { get; set; }
		
		public virtual Domain Domain { get; set; }

	}
}