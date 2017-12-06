using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class EncodingResponse : Entity<Guid>
	{
				
		[Required]
		[StringLength(50)]
		public string ResponseCode { get; set; }
						
		[Required]
		public Guid SurveyId { get; set; }
						
		[Required]
		public Guid DomainId { get; set; }
						
		[StringLength(4000)]
		public string DomainName { get; set; }
						
		[Required]
		[StringLength(4000)]
		public string Title { get; set; }
						
		[Required]
		[StringLength(100)]
		public string UserName { get; set; }
						
		[StringLength(128)]
		public string CoderId { get; set; }
						
		[StringLength(100)]
		public string CoderName { get; set; }
						
		public DateTime? DateCoded { get; set; }
						
		[StringLength(128)]
		public string ReviewerId { get; set; }
						
		[StringLength(100)]
		public string ReviewerName { get; set; }
						
		public DateTime? DateReviewed { get; set; }
						
		[Required]
		public int Status { get; set; }
						
		[Required]
		public int Index { get; set; }
						
		public string ResponseAnswers { get; set; }
		

	}
}