using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.Questions.Dto;

namespace AbpCompanyName.AbpProjectName.Questions
{
	public class QuestionAppService : AsyncFilteredAppService<Question, QuestionDto, Guid, FilteredResultRequestDto>, IQuestionAppService
	{
		public QuestionAppService(IRepository<Question, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "Title ASC";
		}
		protected override void MapToEntity(QuestionDto updateInput, Question entity)
        {
            var dbQuestionAnswers = new List<QuestionAnswer>(entity.QuestionAnswers);
            var dbValidationRules = new List<ValidationRule>(entity.ValidationRules);
            
            base.MapToEntity(updateInput, entity);

            UpdateCollection(dbQuestionAnswers, entity.QuestionAnswers);
            UpdateCollection(dbValidationRules, entity.ValidationRules);
        }

		protected override IQueryable<Question> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.DomainGroup, 
				e => e.QuestionGroup, 
				e => e.QuestionAnswers, 
				e => e.ValidationRules
			);
        }
	}
}