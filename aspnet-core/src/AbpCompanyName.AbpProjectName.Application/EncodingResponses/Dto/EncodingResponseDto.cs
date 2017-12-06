using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.EncodingResponses.Dto
{
	[AutoMap(typeof(EncodingResponse))]
	public class EncodingResponseDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "EncodingResponseResponseCodeRequired")]
		[StringLength(50,ErrorMessage="EncodingResponseResponseCodeMaxLength")]
		public string ResponseCode { get; set; }
						
		[Required(ErrorMessage = "EncodingResponseSurveyIdRequired")]
		public Guid SurveyId { get; set; }
						
		[Required(ErrorMessage = "EncodingResponseDomainIdRequired")]
		public Guid DomainId { get; set; }
						
		[StringLength(4000,ErrorMessage="EncodingResponseDomainNameMaxLength")]
		public string DomainName { get; set; }
						
		[Required(ErrorMessage = "EncodingResponseTitleRequired")]
		[StringLength(4000,ErrorMessage="EncodingResponseTitleMaxLength")]
		public string Title { get; set; }
						
		[Required(ErrorMessage = "EncodingResponseUserNameRequired")]
		[StringLength(100,ErrorMessage="EncodingResponseUserNameMaxLength")]
		public string UserName { get; set; }
						
		[StringLength(128,ErrorMessage="EncodingResponseCoderIdMaxLength")]
		public string CoderId { get; set; }
						
		[StringLength(100,ErrorMessage="EncodingResponseCoderNameMaxLength")]
		public string CoderName { get; set; }
						
		public DateTime? DateCoded { get; set; }
						
		[StringLength(128,ErrorMessage="EncodingResponseReviewerIdMaxLength")]
		public string ReviewerId { get; set; }
						
		[StringLength(100,ErrorMessage="EncodingResponseReviewerNameMaxLength")]
		public string ReviewerName { get; set; }
						
		public DateTime? DateReviewed { get; set; }
						
		[Required(ErrorMessage = "EncodingResponseStatusRequired")]
		public int Status { get; set; }
						
		[Required(ErrorMessage = "EncodingResponseIndexRequired")]
		public int Index { get; set; }
						
		public string ResponseAnswers { get; set; }
		

	}
}