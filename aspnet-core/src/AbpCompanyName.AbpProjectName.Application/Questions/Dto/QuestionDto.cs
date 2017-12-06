using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.Questions.Dto
{
	[AutoMap(typeof(Question))]
	public class QuestionDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "QuestionTitleRequired")]
		public string Title { get; set; }
						
		[Required(ErrorMessage = "QuestionIsActiveRequired")]
		public bool IsActive { get; set; }
						
		[Required(ErrorMessage = "QuestionOrderRequired")]
		public int Order { get; set; }
						
		[Required(ErrorMessage = "QuestionQuestionTypeRequired")]
		public int QuestionType { get; set; }
						
		public Guid? DomainGroupId { get; set; }
				public string DomainGroupName { get; set; }
				
		public int? DomainGroupLevelsNumber { get; set; }
						
		[Required(ErrorMessage = "QuestionQuestionGroupIdRequired")]
		public Guid QuestionGroupId { get; set; }
				public string QuestionGroupName { get; set; }
				
		[StringLength(50,ErrorMessage="QuestionCodeMaxLength")]
		public string Code { get; set; }
						
		public bool? IsRequired { get; set; }
						
		public bool? IsHidden { get; set; }
						
		[StringLength(500,ErrorMessage="QuestionDescriptionMaxLength")]
		public string Description { get; set; }
						
		[StringLength(50,ErrorMessage="QuestionQuestionNumberMaxLength")]
		public string QuestionNumber { get; set; }
						
		public string Help { get; set; }
						
		public string DefaultAnswerValue { get; set; }
						
		public bool? IsUsedInCallBack { get; set; }
						
		public bool? IsUsedInEncoding { get; set; }
		

		public virtual Collection<QuestionAnswerDto> QuestionAnswers { get; set; }
		public virtual Collection<ValidationRuleDto> ValidationRules { get; set; }
	}
}