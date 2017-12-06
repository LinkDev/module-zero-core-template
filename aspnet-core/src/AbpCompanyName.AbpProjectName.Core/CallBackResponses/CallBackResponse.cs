using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class CallBackResponse : Entity<Guid>
	{
				
		[Required]
		public Guid ResponseId { get; set; }
						
		public Guid? SurveyId { get; set; }
						
		[StringLength(128)]
		public string UserId { get; set; }
						
		public DateTime? DateSubmitted { get; set; }
						
		public Guid? ParentResponseId { get; set; }
						
		[StringLength(50)]
		public string Code { get; set; }
						
		public Guid? DomainId { get; set; }
						
		public int? Status { get; set; }
						
		public string Title { get; set; }
						
		public int? Order { get; set; }
						
		public DateTime? LastUpdateTime { get; set; }
						
		[StringLength(50)]
		public string SubCode { get; set; }
						
		public Guid? PhaseId { get; set; }
						
		[StringLength(50)]
		public string GISUniqueCode { get; set; }
						
		public bool? IsPrinted { get; set; }
						
		public Guid? SampleID { get; set; }
						
		public long? ResIdx { get; set; }
						
		public bool? HvResponsesAnswer { get; set; }
						
		public decimal? SimilarityPercentage { get; set; }
						
		public bool? Correspondence { get; set; }
						
		public Guid? CbParentResponseId { get; set; }
						
		public int? ResponseStatus { get; set; }
		
		public virtual Survey Survey { get; set; }
		public virtual Domain Domain { get; set; }
		public virtual Phase Phase { get; set; }
		public virtual Sample Sample { get; set; }
		public virtual CallBackResponse cbParentResponse { get; set; }
		public virtual Collection<CallBackResponse> CallBackResponses { get; set; }

	}
}