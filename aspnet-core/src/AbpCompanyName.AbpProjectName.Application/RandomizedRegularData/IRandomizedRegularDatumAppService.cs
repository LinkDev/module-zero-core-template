using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.RandomizedRegularData.Dto;

namespace AbpCompanyName.AbpProjectName.RandomizedRegularData
{
	public interface IRandomizedRegularDatumAppService : IFilteredAppService<RandomizedRegularDatumDto, int, FilteredResultRequestDto>
	{
		
	}
}