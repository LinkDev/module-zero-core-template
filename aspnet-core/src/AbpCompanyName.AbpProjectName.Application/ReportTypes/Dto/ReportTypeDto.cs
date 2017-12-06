using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.ReportTypes.Dto
{
	[AutoMap(typeof(ReportType))]
	public class ReportTypeDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "ReportTypeNameRequired")]
		[StringLength(250,ErrorMessage="ReportTypeNameMaxLength")]
		public string Name { get; set; }
		

	}
}