using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.TrainingExams.Dto;

namespace AbpCompanyName.AbpProjectName.TrainingExams
{
	public class TrainingExamAppService : AsyncFilteredAppService<TrainingExam, TrainingExamDto, Guid, FilteredResultRequestDto>, ITrainingExamAppService
	{
		public TrainingExamAppService(IRepository<TrainingExam, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "Name ASC";
		}

		protected override IQueryable<TrainingExam> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.TrainingProgram
			);
        }
	}
}