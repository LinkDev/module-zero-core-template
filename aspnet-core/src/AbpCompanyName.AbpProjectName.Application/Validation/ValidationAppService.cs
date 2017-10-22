using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using AbpCompanyName.AbpProjectName.Validation.Dto;

namespace AbpCompanyName.AbpProjectName.Validation
{
    public class ValidationAppService : AbpProjectNameAppServiceBase, IValidationAppService
    {
        public IEnumerable<ValidationDto> GetValidations(string DtoName)
        {
            List<ValidationDto> validations = new List<ValidationDto>();

            var FolderName = DtoName.Replace("Dto", "");
            var type = Type.GetType($"AbpCompanyName.AbpProjectName.{FolderName}s.Dto.{DtoName}", false, true);
            var Properties = type.GetProperties();
            foreach (var prop in Properties)
            {
                var DisplayAttr = (prop.GetCustomAttribute(typeof(DisplayAttribute))) as DisplayAttribute;

                ValidationDto VDto = new ValidationDto() { Name = prop.Name };
                
                if (DisplayAttr is null) VDto.DisplayName = prop.Name; else VDto.DisplayName = DisplayAttr.Name;

                var attributes = (IEnumerable<ValidationAttribute>)prop.GetCustomAttributes(typeof(ValidationAttribute));
                if (attributes.Count() > 0)
                {
                    List<ValidationTypes> VT = new List<ValidationTypes>();
                    foreach (var attr in attributes)
                    {
                        if (attr is RequiredAttribute)
                        {
                            VT.Add(new ValidationTypes
                            {
                                ValidationName = "Required",
                                ErrorMessage = attr.ErrorMessage is null ? $"{prop.Name} Is Required" : attr.ErrorMessage
                            });
                        }
                        else if (attr is StringLengthAttribute)
                        {
                            var SL = attr as StringLengthAttribute;
                            VT.Add(new ValidationTypes
                            {
                                ValidationName = "StringLength",
                                ErrorMessage = attr.ErrorMessage is null ? $"{prop.Name} Max Length is {SL.MaximumLength} and the Min Length is {SL.MinimumLength}" : attr.ErrorMessage,
                                MaxLength = SL.MaximumLength,
                                MinLength = SL.MinimumLength
                            });
                        }
                        else if (attr is MaxLengthAttribute)
                        {
                            var ML = attr as MaxLengthAttribute;
                            VT.Add(new ValidationTypes
                            {
                                ValidationName = "MaxLength",
                                ErrorMessage = attr.ErrorMessage is null ? $"{prop.Name} Max Length is {ML.Length}" : attr.ErrorMessage,
                                MaxLength = ML.Length,
                            });
                        }
                        else if (attr is MinLengthAttribute)
                        {
                            var ML = attr as MinLengthAttribute;
                            VT.Add(new ValidationTypes
                            {
                                ValidationName = "MinLength",
                                ErrorMessage = attr.ErrorMessage is null ? $"{prop.Name} Min Length is {ML.Length}" : attr.ErrorMessage,
                                MinLength = ML.Length,
                            });

                        }

                    }
                    VDto.ValidationTypes = VT.AsEnumerable();
                }
                validations.Add(VDto);
            }

            return validations.AsEnumerable();
        }
    }
}
