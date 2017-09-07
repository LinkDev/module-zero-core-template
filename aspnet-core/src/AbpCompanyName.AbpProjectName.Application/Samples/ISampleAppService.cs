using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.Samples.Dto;

namespace AbpCompanyName.AbpProjectName.Samples
{
	public interface ISampleAppService : IFilteredAppService<SampleDto, int, FilteredResultRequestDto>
	{
		
	}
}