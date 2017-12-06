using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.RandomizedRegularData.Dto
{
	[AutoMap(typeof(RandomizedRegularDatum))]
	public class RandomizedRegularDatumDto : EntityDto
	{
				
		[Required(ErrorMessage = "RandomizedRegularDatumMinRangeRequired")]
		public int MinRange { get; set; }
						
		[Required(ErrorMessage = "RandomizedRegularDatumMaxRangeRequired")]
		public long MaxRange { get; set; }
						
		[Required(ErrorMessage = "RandomizedRegularDatumPercentageRequired")]
		public decimal Percentage { get; set; }
						
		[Required(ErrorMessage = "RandomizedRegularDatumIntervalRequired")]
		public int Interval { get; set; }
		

	}
}