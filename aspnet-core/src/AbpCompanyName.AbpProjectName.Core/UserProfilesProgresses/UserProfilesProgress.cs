using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class UserProfilesProgress : Entity<Guid>
	{
				
		[StringLength(128)]
		public string UserProfileId { get; set; }
						
		public bool? IsActive { get; set; }
						
		[Required]
		[StringLength(128)]
		public string UserId { get; set; }
						
		[Required]
		[StringLength(250)]
		public string UserName { get; set; }
						
		[Required]
		[StringLength(50)]
		public string UserCode { get; set; }
						
		[StringLength(128)]
		public string ManagerId { get; set; }
						
		[Required]
		public Guid SurveyId { get; set; }
						
		[Required]
		public int Count { get; set; }
						
		public Guid? CreationPhaseId { get; set; }
		

	}
}