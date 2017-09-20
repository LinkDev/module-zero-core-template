using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.Departments.Dto;

namespace AbpCompanyName.AbpProjectName.Departments
{
	public class DepartmentAppService : AsyncFilteredAppService<Department, DepartmentDto, int, FilteredResultRequestDto>, IDepartmentAppService
	{
		public DepartmentAppService(IRepository<Department, int> repository)
            : base(repository)
        {
			this.DefaultSort = "Name ASC";
		}

	}
}