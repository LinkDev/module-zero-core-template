using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.TrainingProgramDocuments.Dto;

namespace AbpCompanyName.AbpProjectName.TrainingProgramDocuments
{
	public class TrainingProgramDocumentAppService : AsyncFilteredAppService<TrainingProgramDocument, TrainingProgramDocumentDto, Guid, FilteredResultRequestDto>, ITrainingProgramDocumentAppService
	{
		public TrainingProgramDocumentAppService(IRepository<TrainingProgramDocument, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "Name ASC";
		}

		protected override IQueryable<TrainingProgramDocument> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.TrainingProgram
			);
        }
	}
}