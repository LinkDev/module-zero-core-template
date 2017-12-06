using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class QualityCallBackResponseAnswer : Entity
	{
				
		[Required]
		public Guid ResponseAnswerId { get; set; }
						
		[Required]
		public Guid QuestionId { get; set; }
						
		public Guid? QuestionAnswerId { get; set; }
						
		[StringLength(800)]
		public string AnswerValue { get; set; }
						
		public decimal? AnswerNumber { get; set; }
						
		public DateTime? AnswerTime { get; set; }
						
		public Guid? ResponseId { get; set; }
						
		public int? Status { get; set; }
		

	}
}