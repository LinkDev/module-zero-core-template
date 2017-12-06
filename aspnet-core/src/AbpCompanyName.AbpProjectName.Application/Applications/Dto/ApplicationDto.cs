using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.Applications.Dto
{
	[AutoMap(typeof(Application))]
	public class ApplicationDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "ApplicationNameRequired")]
		[StringLength(200,ErrorMessage="ApplicationNameMaxLength")]
		public string Name { get; set; }
						
		public Guid? CurrentPhaseId { get; set; }
				public string CurrentPhaseName { get; set; }
				
		public bool? IsEnabled { get; set; }
						
		[Required(ErrorMessage = "ApplicationIsActiveRequired")]
		public bool IsActive { get; set; }
						
		[StringLength(500,ErrorMessage="ApplicationLogoMaxLength")]
		public string Logo { get; set; }
						
		public Guid? CategoryId { get; set; }
				public string CategoryName { get; set; }
				
		public int? AvailableFor { get; set; }
		

	}
}