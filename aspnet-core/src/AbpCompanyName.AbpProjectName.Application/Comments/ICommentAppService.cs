using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.Comments.Dto;

namespace AbpCompanyName.AbpProjectName.Comments
{
	public interface ICommentAppService : IFilteredAppService<CommentDto, Guid, FilteredResultRequestDto>
	{
		
	}
}