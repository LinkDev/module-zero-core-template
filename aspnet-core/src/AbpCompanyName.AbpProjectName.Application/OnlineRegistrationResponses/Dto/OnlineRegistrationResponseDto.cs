using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.OnlineRegistrationResponses.Dto
{
	[AutoMap(typeof(OnlineRegistrationResponse))]
	public class OnlineRegistrationResponseDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "OnlineRegistrationResponseNationalIdRequired")]
		[StringLength(50,ErrorMessage="OnlineRegistrationResponseNationalIdMaxLength")]
		public string NationalId { get; set; }
						
		[Required(ErrorMessage = "OnlineRegistrationResponsePhoneNumberRequired")]
		[StringLength(50,ErrorMessage="OnlineRegistrationResponsePhoneNumberMaxLength")]
		public string PhoneNumber { get; set; }
						
		[StringLength(50,ErrorMessage="OnlineRegistrationResponseCodeMaxLength")]
		public string Code { get; set; }
						
		public Guid? UnitType { get; set; }
		

	}
}