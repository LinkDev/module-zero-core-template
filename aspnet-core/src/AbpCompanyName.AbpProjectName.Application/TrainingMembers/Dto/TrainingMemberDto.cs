using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.TrainingMembers.Dto
{
	[AutoMap(typeof(TrainingMember))]
	public class TrainingMemberDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "TrainingMemberNameRequired")]
		[StringLength(200,ErrorMessage="TrainingMemberNameMaxLength")]
		public string Name { get; set; }
						
		[Required(ErrorMessage = "TrainingMemberAgeRequired")]
		public int Age { get; set; }
						
		[Required(ErrorMessage = "TrainingMemberTelephoneRequired")]
		[StringLength(50,ErrorMessage="TrainingMemberTelephoneMaxLength")]
		public string Telephone { get; set; }
						
		[StringLength(50,ErrorMessage="TrainingMemberEmailMaxLength")]
		public string Email { get; set; }
						
		[Required(ErrorMessage = "TrainingMemberNationalIdRequired")]
		[StringLength(50,ErrorMessage="TrainingMemberNationalIdMaxLength")]
		public string NationalId { get; set; }
						
		[StringLength(500,ErrorMessage="TrainingMemberAddressMaxLength")]
		public string Address { get; set; }
						
		public DateTime? DateCreated { get; set; }
						
		[Required(ErrorMessage = "TrainingMemberCreatedByIdRequired")]
		[StringLength(128,ErrorMessage="TrainingMemberCreatedByIdMaxLength")]
		public string CreatedById { get; set; }
						
		[Required(ErrorMessage = "TrainingMemberTrainingCenterIdRequired")]
		public Guid TrainingCenterId { get; set; }
				public string TrainingCenterName { get; set; }
				
		[Required(ErrorMessage = "TrainingMemberTrainingProgramIdRequired")]
		public Guid TrainingProgramId { get; set; }
				public string TrainingProgramName { get; set; }


	}
}