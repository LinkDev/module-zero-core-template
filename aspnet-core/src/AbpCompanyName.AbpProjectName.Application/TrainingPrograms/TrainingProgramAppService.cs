using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.TrainingPrograms.Dto;

namespace AbpCompanyName.AbpProjectName.TrainingPrograms
{
	public class TrainingProgramAppService : AsyncFilteredAppService<TrainingProgram, TrainingProgramDto, Guid, FilteredResultRequestDto>, ITrainingProgramAppService
	{
		public TrainingProgramAppService(IRepository<TrainingProgram, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "Name ASC";
		}

		protected override IQueryable<TrainingProgram> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.Phase
			);
        }
	}
}