using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.TempFilteredResponses.Dto
{
	[AutoMap(typeof(TempFilteredResponse))]
	public class TempFilteredResponseDto : EntityDto<Guid>
	{
				
		public Guid? ParentResponseId { get; set; }
						
		[Required(ErrorMessage = "TempFilteredResponseCodeRequired")]
		[StringLength(100,ErrorMessage="TempFilteredResponseCodeMaxLength")]
		public string Code { get; set; }
						
		[Required(ErrorMessage = "TempFilteredResponseRowIndexRequired")]
		public int RowIndex { get; set; }
		

	}
}