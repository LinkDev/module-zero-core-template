using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.TrainingCenterUsers.Dto;

namespace AbpCompanyName.AbpProjectName.TrainingCenterUsers
{
	public class TrainingCenterUserAppService : AsyncFilteredAppService<TrainingCenterUser, TrainingCenterUserDto, Guid, FilteredResultRequestDto>, ITrainingCenterUserAppService
	{
		public TrainingCenterUserAppService(IRepository<TrainingCenterUser, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "UserId ASC";
		}

		protected override IQueryable<TrainingCenterUser> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.TrainingCenter
			);
        }
	}
}