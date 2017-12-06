using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.RandomizedRegularDataByDomains.Dto;

namespace AbpCompanyName.AbpProjectName.RandomizedRegularDataByDomains
{
	public interface IRandomizedRegularDataByDomainAppService : IFilteredAppService<RandomizedRegularDataByDomainDto, Guid, FilteredResultRequestDto>
	{
		
	}
}