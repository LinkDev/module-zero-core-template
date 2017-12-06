using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.QualityCallBackResponseAnswers.Dto;

namespace AbpCompanyName.AbpProjectName.QualityCallBackResponseAnswers
{
	public class QualityCallBackResponseAnswerAppService : AsyncFilteredAppService<QualityCallBackResponseAnswer, QualityCallBackResponseAnswerDto, int, FilteredResultRequestDto>, IQualityCallBackResponseAnswerAppService
	{
		public QualityCallBackResponseAnswerAppService(IRepository<QualityCallBackResponseAnswer, int> repository)
            : base(repository)
        {
			this.DefaultSort = "AnswerValue ASC";
		}

	}
}