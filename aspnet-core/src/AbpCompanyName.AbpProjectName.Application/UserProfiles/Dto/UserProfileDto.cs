using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.UserProfiles.Dto
{
	[AutoMap(typeof(UserProfile))]
	public class UserProfileDto : EntityDto<Guid>
	{
				
		[StringLength(128,ErrorMessage="UserProfileUserIdMaxLength")]
		public string UserId { get; set; }
						
		[StringLength(400,ErrorMessage="UserProfileFullNameMaxLength")]
		public string FullName { get; set; }
						
		[StringLength(50,ErrorMessage="UserProfileNationalIdMaxLength")]
		public string NationalId { get; set; }
						
		public int? ContractType { get; set; }
						
		[StringLength(400,ErrorMessage="UserProfilePaymentNumberMaxLength")]
		public string PaymentNumber { get; set; }
						
		public int? BankName { get; set; }
						
		[StringLength(400,ErrorMessage="UserProfileBankAccountMaxLength")]
		public string BankAccount { get; set; }
						
		public bool? IsActive { get; set; }
						
		public DateTime? CreatedDate { get; set; }
		

	}
}