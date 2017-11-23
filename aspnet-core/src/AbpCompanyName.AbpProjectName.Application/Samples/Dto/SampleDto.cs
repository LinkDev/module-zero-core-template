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
	public class SampleDto : EntityDto
	{
		
		[Required(ErrorMessage = "SampleBioRequired")]
		public string Bio { get; set; }
		
		[StringLength(50,ErrorMessage="SampleNameMaxLength")]
		public string Name { get; set; }
		
		[Required(ErrorMessage = "SamplePublishDateRequired")]
		public DateTime PublishDate { get; set; }


	}
}