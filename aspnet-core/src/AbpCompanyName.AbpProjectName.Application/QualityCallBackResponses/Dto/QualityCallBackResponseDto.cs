using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.QualityCallBackResponses.Dto
{
	[AutoMap(typeof(QualityCallBackResponse))]
	public class QualityCallBackResponseDto : EntityDto
	{
				
		[Required(ErrorMessage = "QualityCallBackResponseResponseIdRequired")]
		public Guid ResponseId { get; set; }
						
		[Required(ErrorMessage = "QualityCallBackResponseSurveyIdRequired")]
		public Guid SurveyId { get; set; }
						
		[StringLength(128,ErrorMessage="QualityCallBackResponseUserIdMaxLength")]
		public string UserId { get; set; }
						
		public Guid? ParentResponseId { get; set; }
						
		public DateTime? StartTime { get; set; }
						
		public DateTime? EndTime { get; set; }
						
		[Required(ErrorMessage = "QualityCallBackResponseCodeRequired")]
		[StringLength(50,ErrorMessage="QualityCallBackResponseCodeMaxLength")]
		public string Code { get; set; }
						
		[Required(ErrorMessage = "QualityCallBackResponseDomainIdRequired")]
		public Guid DomainId { get; set; }
						
		[Required(ErrorMessage = "QualityCallBackResponseStatusRequired")]
		public int Status { get; set; }
						
		[StringLength(250,ErrorMessage="QualityCallBackResponseTitleMaxLength")]
		public string Title { get; set; }
						
		public DateTime? LastUpdateTime { get; set; }
						
		[Required(ErrorMessage = "QualityCallBackResponseIsRealRequired")]
		public bool IsReal { get; set; }
						
		[Required(ErrorMessage = "QualityCallBackResponsePhaseIdRequired")]
		public Guid PhaseId { get; set; }
						
		public Guid? CreationPhaseId { get; set; }
						
		public int? SkipReason { get; set; }
						
		[StringLength(500,ErrorMessage="QualityCallBackResponseSkipCommentMaxLength")]
		public string SkipComment { get; set; }
						
		[Required(ErrorMessage = "QualityCallBackResponseCalledByCallCenterRequired")]
		public int CalledByCallCenter { get; set; }
						
		[StringLength(500,ErrorMessage="QualityCallBackResponseCallCenterCommentMaxLength")]
		public string CallCenterComment { get; set; }
						
		public decimal? SimilarityPercentage { get; set; }
		

	}
}