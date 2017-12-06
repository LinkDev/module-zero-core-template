using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.ViolatedValidationRules.Dto
{
	[AutoMap(typeof(ViolatedValidationRule))]
	public class ViolatedValidationRuleDto : IEntityDto<Guid>
	{
				
		[Required(ErrorMessage = "ViolatedValidationRuleResponseAnswerIdRequired")]
		public Guid ResponseAnswerId { get; set; }
						
		[Required(ErrorMessage = "ViolatedValidationRuleValidationRuleIdRequired")]
		public Guid ValidationRuleId { get; set; }
						
		[Required(ErrorMessage = "ViolatedValidationRuleResponseIdRequired")]
		public Guid ResponseId { get; set; }
		
		[NotMapped]
        public Guid Id { get { return ValidationRuleId; } set { ValidationRuleId = value; } }

	}
}