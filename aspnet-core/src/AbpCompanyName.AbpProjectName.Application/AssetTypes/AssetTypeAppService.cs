using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.AssetTypes.Dto;

namespace AbpCompanyName.AbpProjectName.AssetTypes
{
	public class AssetTypeAppService : AsyncFilteredAppService<AssetType, AssetTypeDto, Guid, FilteredResultRequestDto>, IAssetTypeAppService
	{
		public AssetTypeAppService(IRepository<AssetType, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "Name ASC";
		}

	}
}