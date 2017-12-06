using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.UsersAssignments.Dto;

namespace AbpCompanyName.AbpProjectName.UsersAssignments
{
	public class UsersAssignmentAppService : AsyncFilteredAppService<UsersAssignment, UsersAssignmentDto, int, FilteredResultRequestDto>, IUsersAssignmentAppService
	{
		public UsersAssignmentAppService(IRepository<UsersAssignment, int> repository)
            : base(repository)
        {
			this.DefaultSort = "DomainCode ASC";
		}

	}
}