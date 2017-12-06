using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.EncodingMapperQuestions.Dto;

namespace AbpCompanyName.AbpProjectName.EncodingMapperQuestions
{
	public class EncodingMapperQuestionAppService : AsyncFilteredAppService<EncodingMapperQuestion, EncodingMapperQuestionDto, int, FilteredResultRequestDto>, IEncodingMapperQuestionAppService
	{
		public EncodingMapperQuestionAppService(IRepository<EncodingMapperQuestion, int> repository)
            : base(repository)
        {
			this.DefaultSort = "Id ASC";
		}

	}
}