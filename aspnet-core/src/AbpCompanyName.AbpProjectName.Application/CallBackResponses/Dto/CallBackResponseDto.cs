using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.CallBackResponses.Dto
{
	[AutoMap(typeof(CallBackResponse))]
	public class CallBackResponseDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "CallBackResponseResponseIdRequired")]
		public Guid ResponseId { get; set; }
						
		public Guid? SurveyId { get; set; }
				public string SurveyName { get; set; }
				
		[StringLength(128,ErrorMessage="CallBackResponseUserIdMaxLength")]
		public string UserId { get; set; }
						
		public DateTime? DateSubmitted { get; set; }
						
		public Guid? ParentResponseId { get; set; }
						
		[StringLength(50,ErrorMessage="CallBackResponseCodeMaxLength")]
		public string Code { get; set; }
						
		public Guid? DomainId { get; set; }
				public string DomainName { get; set; }
				
		public int? Status { get; set; }
						
		public string Title { get; set; }
						
		public int? Order { get; set; }
						
		public DateTime? LastUpdateTime { get; set; }
						
		[StringLength(50,ErrorMessage="CallBackResponseSubCodeMaxLength")]
		public string SubCode { get; set; }
						
		public Guid? PhaseId { get; set; }
				public string PhaseName { get; set; }
				
		[StringLength(50,ErrorMessage="CallBackResponseGISUniqueCodeMaxLength")]
		public string GISUniqueCode { get; set; }
						
		public bool? IsPrinted { get; set; }
						
		public Guid? SampleID { get; set; }
				public string SampleCreateBy { get; set; }
				
		public long? ResIdx { get; set; }
						
		public bool? HvResponsesAnswer { get; set; }
						
		public decimal? SimilarityPercentage { get; set; }
						
		public bool? Correspondence { get; set; }
						
		public Guid? CbParentResponseId { get; set; }
				public string cbParentResponseUserId { get; set; }
				
		public int? ResponseStatus { get; set; }
		

	}
}