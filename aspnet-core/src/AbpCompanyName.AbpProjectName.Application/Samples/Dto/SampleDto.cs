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
		
		[Required]
		public string Bio { get; set; }
		
		[StringLength(50)]
		public string Name { get; set; }
		
		[Required]
		public DateTime PublishDate { get; set; }


	}
}