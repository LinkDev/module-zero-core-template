using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.Phases.Dto
{
	[AutoMap(typeof(Phase))]
	public class PhaseDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "PhaseNameRequired")]
		[StringLength(200,ErrorMessage="PhaseNameMaxLength")]
		public string Name { get; set; }
						
		[Required(ErrorMessage = "PhaseApplicationIdRequired")]
		public Guid ApplicationId { get; set; }
				public string ApplicationName { get; set; }
				
		public DateTime? From { get; set; }
						
		public DateTime? To { get; set; }
						
		[Required(ErrorMessage = "PhaseOrderRequired")]
		public int Order { get; set; }
						
		[Required(ErrorMessage = "PhaseIsActiveRequired")]
		public bool IsActive { get; set; }
						
		[Required(ErrorMessage = "PhaseBaseDomainGroupIdRequired")]
		public Guid BaseDomainGroupId { get; set; }
				public string BaseDomainGroupName { get; set; }
				
		public Guid? DomainGroupId { get; set; }
				public string DomainGroupName { get; set; }
				
		public Guid? DefaultSurveyId { get; set; }
		

	}
}