using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.UsersAssignments.Dto;

namespace AbpCompanyName.AbpProjectName.UsersAssignments
{
	public interface IUsersAssignmentAppService : IFilteredAppService<UsersAssignmentDto, int, FilteredResultRequestDto>
	{
		
	}
}