using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.Regices.Dto
{
	[AutoMap(typeof(RegEx))]
	public class RegExDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "RegExNameRequired")]
		[StringLength(200,ErrorMessage="RegExNameMaxLength")]
		public string Name { get; set; }
						
		[StringLength(200,ErrorMessage="RegExNameEnMaxLength")]
		public string NameEn { get; set; }
						
		[Required(ErrorMessage = "RegExRegExRequired")]
		public string RegEx { get; set; }
						
		public Guid? CategoryId { get; set; }
				public string CategoryName { get; set; }


	}
}