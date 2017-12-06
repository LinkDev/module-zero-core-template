using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class Response : Entity<Guid>
	{
				
		[Required]
		public Guid SurveyId { get; set; }
						
		[StringLength(128)]
		public string UserId { get; set; }
						
		public DateTime? DateSubmitted { get; set; }
						
		public Guid? ParentResponseId { get; set; }
						
		public DateTime? StartTime { get; set; }
						
		public DateTime? EndTime { get; set; }
										
		[Required]
		[StringLength(50)]
		public string Code { get; set; }
						
		[Required]
		public Guid DomainId { get; set; }
						
		[Required]
		public int Status { get; set; }
						
		public Guid? SubStatusId { get; set; }
						
		public string Title { get; set; }
						
		[Required]
		public int Order { get; set; }
						
		public DateTime? LastUpdateTime { get; set; }
								
		[Required]
		public bool IsReal { get; set; }
						
		[Required]
		public bool IsNew { get; set; }
						
		[StringLength(50)]
		public string SubCode { get; set; }
						
		[Required]
		public Guid PhaseId { get; set; }
						
		public Guid? CreationPhaseId { get; set; }
						
		public Guid? DeletionPhaseId { get; set; }
						
		[StringLength(50)]
		public string GISUniqueCode { get; set; }
						
		public int? SkipReason { get; set; }
						
		[StringLength(500)]
		public string SkipComment { get; set; }
						
		[Required]
		public int CalledByCallCenter { get; set; }
						
		[StringLength(500)]
		public string CallCenterComment { get; set; }
						
		public decimal? SimilarityPercentage { get; set; }
						
		public bool? IsPulled { get; set; }
						
		public int? CodeToPartition { get; set; }
						
		[Required]
		public int Source { get; set; }
		
		public virtual Collection<Comment> Comments { get; set; }

	}
}