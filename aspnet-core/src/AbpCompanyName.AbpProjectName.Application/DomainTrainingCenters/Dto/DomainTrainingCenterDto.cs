using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.DomainTrainingCenters.Dto
{
	[AutoMap(typeof(DomainTrainingCenter))]
	public class DomainTrainingCenterDto : IEntityDto<Guid>
	{
				
		[Required(ErrorMessage = "DomainTrainingCenterTrainingCenterIdRequired")]
		public Guid TrainingCenterId { get; set; }
				public string TrainingCenterName { get; set; }
				
		[Required(ErrorMessage = "DomainTrainingCenterDomainIdRequired")]
		public Guid DomainId { get; set; }
				public string DomainName { get; set; }

		[NotMapped]
        public Guid Id { get { return DomainId; } set { DomainId = value; } }

	}
}