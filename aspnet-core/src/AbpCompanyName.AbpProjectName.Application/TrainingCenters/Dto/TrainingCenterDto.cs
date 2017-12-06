using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.TrainingCenters.Dto
{
	[AutoMap(typeof(TrainingCenter))]
	public class TrainingCenterDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "TrainingCenterNameRequired")]
		[StringLength(200,ErrorMessage="TrainingCenterNameMaxLength")]
		public string Name { get; set; }
						
		[Required(ErrorMessage = "TrainingCenterIsActiveRequired")]
		public bool IsActive { get; set; }
		

	}
}