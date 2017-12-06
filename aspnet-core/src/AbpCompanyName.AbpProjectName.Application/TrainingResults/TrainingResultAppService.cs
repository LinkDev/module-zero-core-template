using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.TrainingResults.Dto;

namespace AbpCompanyName.AbpProjectName.TrainingResults
{
	public class TrainingResultAppService : AsyncFilteredAppService<TrainingResult, TrainingResultDto, Guid, FilteredResultRequestDto>, ITrainingResultAppService
	{
		public TrainingResultAppService(IRepository<TrainingResult, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "Id ASC";
		}

		protected override IQueryable<TrainingResult> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.TrainingMember, 
				e => e.TrainingExam
			);
        }
	}
}