using System.Collections.Generic;


namespace AbpCompanyName.AbpProjectName.Validation.Dto
{
    public class ValidationDto
    {
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public IEnumerable<ValidationTypes> ValidationTypes { get; set; }
    }
}
