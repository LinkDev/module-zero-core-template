using AbpCompanyName.AbpProjectName.Validation.Dto;
using System.Collections.Generic;

namespace AbpCompanyName.AbpProjectName.Validation
{
    public interface IValidationAppService
    {
        IEnumerable<ValidationDto> GetValidations(string DtoName);
    }
}
