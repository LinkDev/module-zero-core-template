using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.Responses.Dto
{
	[AutoMap(typeof(Response))]
	public class ResponseDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "ResponseSurveyIdRequired")]
		public Guid SurveyId { get; set; }
						
		[StringLength(128,ErrorMessage="ResponseUserIdMaxLength")]
		public string UserId { get; set; }
						
		public DateTime? DateSubmitted { get; set; }
						
		public Guid? ParentResponseId { get; set; }
						
		public DateTime? StartTime { get; set; }
						
		public DateTime? EndTime { get; set; }
										
		[Required(ErrorMessage = "ResponseCodeRequired")]
		[StringLength(50,ErrorMessage="ResponseCodeMaxLength")]
		public string Code { get; set; }
						
		[Required(ErrorMessage = "ResponseDomainIdRequired")]
		public Guid DomainId { get; set; }
						
		[Required(ErrorMessage = "ResponseStatusRequired")]
		public int Status { get; set; }
						
		public Guid? SubStatusId { get; set; }
						
		public string Title { get; set; }
						
		[Required(ErrorMessage = "ResponseOrderRequired")]
		public int Order { get; set; }
						
		public DateTime? LastUpdateTime { get; set; }
								
		[Required(ErrorMessage = "ResponseIsRealRequired")]
		public bool IsReal { get; set; }
						
		[Required(ErrorMessage = "ResponseIsNewRequired")]
		public bool IsNew { get; set; }
						
		[StringLength(50,ErrorMessage="ResponseSubCodeMaxLength")]
		public string SubCode { get; set; }
						
		[Required(ErrorMessage = "ResponsePhaseIdRequired")]
		public Guid PhaseId { get; set; }
						
		public Guid? CreationPhaseId { get; set; }
						
		public Guid? DeletionPhaseId { get; set; }
						
		[StringLength(50,ErrorMessage="ResponseGISUniqueCodeMaxLength")]
		public string GISUniqueCode { get; set; }
						
		public int? SkipReason { get; set; }
						
		[StringLength(500,ErrorMessage="ResponseSkipCommentMaxLength")]
		public string SkipComment { get; set; }
						
		[Required(ErrorMessage = "ResponseCalledByCallCenterRequired")]
		public int CalledByCallCenter { get; set; }
						
		[StringLength(500,ErrorMessage="ResponseCallCenterCommentMaxLength")]
		public string CallCenterComment { get; set; }
						
		public decimal? SimilarityPercentage { get; set; }
						
		public bool? IsPulled { get; set; }
						
		public int? CodeToPartition { get; set; }
						
		[Required(ErrorMessage = "ResponseSourceRequired")]
		public int Source { get; set; }
		

	}
}