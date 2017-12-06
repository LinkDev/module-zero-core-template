using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.ResponseSubStatuses.Dto
{
	[AutoMap(typeof(ResponseSubStatus))]
	public class ResponseSubStatusDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "ResponseSubStatusNameRequired")]
		[StringLength(200,ErrorMessage="ResponseSubStatusNameMaxLength")]
		public string Name { get; set; }
						
		[StringLength(200,ErrorMessage="ResponseSubStatusNameEnMaxLength")]
		public string NameEn { get; set; }
		

	}
}