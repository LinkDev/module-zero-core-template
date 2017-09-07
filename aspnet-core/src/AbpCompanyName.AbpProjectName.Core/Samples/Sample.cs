using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AbpCompanyName.AbpProjectName
{
    public class Sample : Entity
    {
        [StringLength(50)]
        public string Name { get; set; }

        [Required]
        public string Bio { get; set; }

        public DateTime PublishDate { get; set; }
    }
}
