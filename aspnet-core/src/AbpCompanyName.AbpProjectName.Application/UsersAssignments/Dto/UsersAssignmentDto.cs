using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.UsersAssignments.Dto
{
	[AutoMap(typeof(UsersAssignment))]
	public class UsersAssignmentDto : EntityDto
	{
				
		[Required(ErrorMessage = "UsersAssignmentDomainCodeRequired")]
		[StringLength(100,ErrorMessage="UsersAssignmentDomainCodeMaxLength")]
		public string DomainCode { get; set; }
						
		[Required(ErrorMessage = "UsersAssignmentFromRequired")]
		[StringLength(100,ErrorMessage="UsersAssignmentFromMaxLength")]
		public string From { get; set; }
						
		[Required(ErrorMessage = "UsersAssignmentFromActualRequired")]
		[StringLength(100,ErrorMessage="UsersAssignmentFromActualMaxLength")]
		public string FromActual { get; set; }
						
		[Required(ErrorMessage = "UsersAssignmentToRequired")]
		[StringLength(100,ErrorMessage="UsersAssignmentToMaxLength")]
		public string To { get; set; }
						
		[Required(ErrorMessage = "UsersAssignmentToActualRequired")]
		[StringLength(100,ErrorMessage="UsersAssignmentToActualMaxLength")]
		public string ToActual { get; set; }
						
		[Required(ErrorMessage = "UsersAssignmentUserCodeRequired")]
		[StringLength(10,ErrorMessage="UsersAssignmentUserCodeMaxLength")]
		public string UserCode { get; set; }
						
		public bool? ValidInput { get; set; }
						
		[StringLength(50,ErrorMessage="UsersAssignmentInvalidErrorMaxLength")]
		public string InvalidError { get; set; }
						
		public bool? ISValid { get; set; }
						
		[StringLength(128,ErrorMessage="UsersAssignmentLastUpdatedUserMaxLength")]
		public string LastUpdatedUser { get; set; }
		

	}
}