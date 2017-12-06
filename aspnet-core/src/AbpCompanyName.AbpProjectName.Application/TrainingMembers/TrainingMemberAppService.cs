using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.TrainingMembers.Dto;

namespace AbpCompanyName.AbpProjectName.TrainingMembers
{
	public class TrainingMemberAppService : AsyncFilteredAppService<TrainingMember, TrainingMemberDto, Guid, FilteredResultRequestDto>, ITrainingMemberAppService
	{
		public TrainingMemberAppService(IRepository<TrainingMember, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "Name ASC";
		}

		protected override IQueryable<TrainingMember> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.TrainingCenter, 
				e => e.TrainingProgram
			);
        }
	}
}