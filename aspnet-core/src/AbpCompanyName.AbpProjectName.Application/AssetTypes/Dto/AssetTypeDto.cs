using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.AssetTypes.Dto
{
	[AutoMap(typeof(AssetType))]
	public class AssetTypeDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "AssetTypeNameRequired")]
		[StringLength(50,ErrorMessage="AssetTypeNameMaxLength")]
		public string Name { get; set; }
						
		[Required(ErrorMessage = "AssetTypeIsActiveRequired")]
		public bool IsActive { get; set; }
		

	}
}