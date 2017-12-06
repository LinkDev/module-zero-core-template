using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.Questions.Dto
{
	[AutoMap(typeof(QuestionAnswer))]
	public class QuestionAnswerDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "QuestionAnswerTitleRequired")]
		public string Title { get; set; }
						
		[Required(ErrorMessage = "QuestionAnswerIsActiveRequired")]
		public bool IsActive { get; set; }
						
		[Required(ErrorMessage = "QuestionAnswerOrderRequired")]
		public int Order { get; set; }
						
		[StringLength(50,ErrorMessage="QuestionAnswerCodeMaxLength")]
		public string Code { get; set; }
						
		[Required(ErrorMessage = "QuestionAnswerAllowTextRequired")]
		public bool AllowText { get; set; }
		

	}
}