using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class Student : Entity, IPassivable, ISoftDelete
	{
		
		[StringLength(50)]
		public string Name { get; set; }
		
		[Required]
		public string Bio { get; set; }
		
		public int Age { get; set; }
		
		public bool IsDeleted { get; set; }
		
		public bool IsActive { get; set; }


	}
}