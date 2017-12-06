using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class EncodingMapperQuestion : Entity
	{
				
		[Required]
		public Guid CollectorQuestionId { get; set; }
						
		[Required]
		public Guid EncoderQuestionId { get; set; }
						
		[Required]
		public Guid ReviewerQuestionId { get; set; }
						
		[Required]
		public Guid CollectorDetailsQuestionId { get; set; }
		

	}
}