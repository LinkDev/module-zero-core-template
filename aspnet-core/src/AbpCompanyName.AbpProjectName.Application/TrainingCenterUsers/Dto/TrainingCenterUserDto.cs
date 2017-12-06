using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.TrainingCenterUsers.Dto
{
	[AutoMap(typeof(TrainingCenterUser))]
	public class TrainingCenterUserDto : IEntityDto<Guid>
	{
				
		[Required(ErrorMessage = "TrainingCenterUserUserIdRequired")]
		[StringLength(128,ErrorMessage="TrainingCenterUserUserIdMaxLength")]
		public string UserId { get; set; }
						
		[Required(ErrorMessage = "TrainingCenterUserTrainingCenterIdRequired")]
		public Guid TrainingCenterId { get; set; }
				public string TrainingCenterName { get; set; }

		[NotMapped]
        public Guid Id { get { return TrainingCenterId; } set { TrainingCenterId = value; } }

	}
}