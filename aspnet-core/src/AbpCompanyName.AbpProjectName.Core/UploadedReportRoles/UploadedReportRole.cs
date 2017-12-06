using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class UploadedReportRole : IEntity<string>
	{
				
		[Required]
		public Guid UploadedReportId { get; set; }
						
		[Required]
		[StringLength(128)]
		public string RoleId { get; set; }
		
		public virtual UploadedReport UploadedReport { get; set; }

		[NotMapped]
        public string Id { get { return RoleId; } set { RoleId = value; } }

        public bool IsTransient()
        {
			if (string.IsNullOrEmpty(Id))
                return true;
            else
                return false;
        }
	}
}