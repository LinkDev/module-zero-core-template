using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.LocationTrackings.Dto
{
	[AutoMap(typeof(LocationTracking))]
	public class LocationTrackingDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "LocationTrackingObjectIdRequired")]
		[StringLength(128,ErrorMessage="LocationTrackingObjectIdMaxLength")]
		public string ObjectId { get; set; }
						
		public DateTime? Time { get; set; }
								
		public bool? IsInArea { get; set; }
						
		[Required(ErrorMessage = "LocationTrackingIsLastRequired")]
		public bool IsLast { get; set; }
		

	}
}