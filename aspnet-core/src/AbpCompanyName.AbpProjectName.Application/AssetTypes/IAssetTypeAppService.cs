using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.AssetTypes.Dto;

namespace AbpCompanyName.AbpProjectName.AssetTypes
{
	public interface IAssetTypeAppService : IFilteredAppService<AssetTypeDto, Guid, FilteredResultRequestDto>
	{
		
	}
}