using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.Announcements.Dto
{
	[AutoMap(typeof(Announcement))]
	public class AnnouncementDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "AnnouncementMessageRequired")]
		[StringLength(4000,ErrorMessage="AnnouncementMessageMaxLength")]
		public string Message { get; set; }
						
		public Guid? DomainId { get; set; }
				public string DomainName { get; set; }
				
		public DateTime? Date { get; set; }
						
		[StringLength(128,ErrorMessage="AnnouncementSenderIdMaxLength")]
		public string SenderId { get; set; }
		

	}
}