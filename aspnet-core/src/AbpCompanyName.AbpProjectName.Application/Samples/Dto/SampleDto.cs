using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.Samples.Dto
{
	[AutoMap(typeof(Sample))]
	public class SampleDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "SampleCreateByRequired")]
		[StringLength(128,ErrorMessage="SampleCreateByMaxLength")]
		public string CreateBy { get; set; }
						
		[Required(ErrorMessage = "SampleAssignedUserIdRequired")]
		[StringLength(128,ErrorMessage="SampleAssignedUserIdMaxLength")]
		public string AssignedUserId { get; set; }
						
		[Required(ErrorMessage = "SampleSampleSizeRequired")]
		public int SampleSize { get; set; }
						
		[Required(ErrorMessage = "SampleSampleDateRequired")]
		public DateTime SampleDate { get; set; }
						
		[Required(ErrorMessage = "SamplePropertiesRequired")]
		[StringLength(1000,ErrorMessage="SamplePropertiesMaxLength")]
		public string Properties { get; set; }
						
		[Required(ErrorMessage = "SampleTypeOfSampleRequired")]
		public byte TypeOfSample { get; set; }
		

	}
}