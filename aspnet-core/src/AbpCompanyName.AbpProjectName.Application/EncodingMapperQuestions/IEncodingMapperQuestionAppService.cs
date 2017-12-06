using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.EncodingMapperQuestions.Dto;

namespace AbpCompanyName.AbpProjectName.EncodingMapperQuestions
{
	public interface IEncodingMapperQuestionAppService : IFilteredAppService<EncodingMapperQuestionDto, int, FilteredResultRequestDto>
	{
		
	}
}