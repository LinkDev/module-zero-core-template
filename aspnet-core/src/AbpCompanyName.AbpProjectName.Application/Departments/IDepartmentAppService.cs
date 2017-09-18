using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.Departments.Dto;

namespace AbpCompanyName.AbpProjectName.Departments
{
	public interface IDepartmentAppService : IFilteredAppService<DepartmentDto, int, FilteredResultRequestDto>
	{
		
	}
}