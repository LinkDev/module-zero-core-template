using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class UserProfile : Entity<Guid>
	{
				
		[StringLength(128)]
		public string UserId { get; set; }
						
		[StringLength(400)]
		public string FullName { get; set; }
						
		[StringLength(50)]
		public string NationalId { get; set; }
						
		public int? ContractType { get; set; }
						
		[StringLength(400)]
		public string PaymentNumber { get; set; }
						
		public int? BankName { get; set; }
						
		[StringLength(400)]
		public string BankAccount { get; set; }
						
		public bool? IsActive { get; set; }
						
		public DateTime? CreatedDate { get; set; }
		

	}
}