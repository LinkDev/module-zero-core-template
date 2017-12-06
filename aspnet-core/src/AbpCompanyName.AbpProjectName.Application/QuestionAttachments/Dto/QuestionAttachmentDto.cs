using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.QuestionAttachments.Dto
{
	[AutoMap(typeof(QuestionAttachment))]
	public class QuestionAttachmentDto : EntityDto<Guid>
	{
				
		[StringLength(255,ErrorMessage="QuestionAttachmentNameMaxLength")]
		public string Name { get; set; }
						
		public string Description { get; set; }
						
		[Required(ErrorMessage = "QuestionAttachmentPathRequired")]
		[StringLength(500,ErrorMessage="QuestionAttachmentPathMaxLength")]
		public string Path { get; set; }
						
		[Required(ErrorMessage = "QuestionAttachmentOrderRequired")]
		public int Order { get; set; }
						
		[Required(ErrorMessage = "QuestionAttachmentQuestionIdRequired")]
		public Guid QuestionId { get; set; }
				public string QuestionTitle { get; set; }
				
		[Required(ErrorMessage = "QuestionAttachmentTypeRequired")]
		public int Type { get; set; }
		

	}
}