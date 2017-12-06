using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.Comments.Dto
{
	[AutoMap(typeof(Comment))]
	public class CommentDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "CommentResponseIdRequired")]
		public Guid ResponseId { get; set; }
				public string ResponseUserId { get; set; }
				
		public Guid? QuestionId { get; set; }
				public string QuestionTitle { get; set; }
				
		public Guid? QuestionGroupId { get; set; }
				public string QuestionGroupName { get; set; }
				
		[Required(ErrorMessage = "CommentUserIdRequired")]
		[StringLength(128,ErrorMessage="CommentUserIdMaxLength")]
		public string UserId { get; set; }
						
		[Required(ErrorMessage = "CommentUserNameRequired")]
		[StringLength(500,ErrorMessage="CommentUserNameMaxLength")]
		public string UserName { get; set; }
						
		[StringLength(500,ErrorMessage="CommentTitleMaxLength")]
		public string Title { get; set; }
						
		[Required(ErrorMessage = "CommentBodyRequired")]
		public string Body { get; set; }
						
		public DateTime? Date { get; set; }
		

	}
}