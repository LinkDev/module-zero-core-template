using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.DomainSettings.Dto
{
	[AutoMap(typeof(DomainSetting))]
	public class DomainSettingDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "DomainSettingDomainIdRequired")]
		public Guid DomainId { get; set; }
				public string DomainName { get; set; }
				
		public Guid? SurveyId { get; set; }
				public string SurveyName { get; set; }
				
		[Required(ErrorMessage = "DomainSettingKeyRequired")]
		[StringLength(200,ErrorMessage="DomainSettingKeyMaxLength")]
		public string Key { get; set; }
						
		[Required(ErrorMessage = "DomainSettingValueRequired")]
		[StringLength(500,ErrorMessage="DomainSettingValueMaxLength")]
		public string Value { get; set; }
		

	}
}