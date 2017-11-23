using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class Sample : Entity
	{
		
		[Required]
		public string Bio { get; set; }
		
		[StringLength(50)]
		public string Name { get; set; }
		
		[Required]
		public DateTime PublishDate { get; set; }


	}
}