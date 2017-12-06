using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class Comment : Entity<Guid>
	{
				
		[Required]
		public Guid ResponseId { get; set; }
						
		public Guid? QuestionId { get; set; }
						
		public Guid? QuestionGroupId { get; set; }
						
		[Required]
		[StringLength(128)]
		public string UserId { get; set; }
						
		[Required]
		[StringLength(500)]
		public string UserName { get; set; }
						
		[StringLength(500)]
		public string Title { get; set; }
						
		[Required]
		public string Body { get; set; }
						
		public DateTime? Date { get; set; }
		
		public virtual Response Response { get; set; }
		public virtual Question Question { get; set; }
		public virtual QuestionGroup QuestionGroup { get; set; }

	}
}