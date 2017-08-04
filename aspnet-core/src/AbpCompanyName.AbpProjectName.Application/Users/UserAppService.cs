using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Extensions;
using Abp.Domain.Repositories;
using AbpCompanyName.AbpProjectName.Authorization;
using AbpCompanyName.AbpProjectName.Authorization.Users;
using AbpCompanyName.AbpProjectName.Users.Dto;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Abp.IdentityFramework;
using AbpCompanyName.AbpProjectName.Authorization.Roles;
using AbpCompanyName.AbpProjectName.Roles.Dto;
using System;

namespace AbpCompanyName.AbpProjectName.Users
{
    public class UserAppService : AsyncCrudAppService<User, UserDto, long, FilteredResultRequestDto, CreateUserDto, UserDto>, IUserAppService
    {
        private readonly UserManager _userManager;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IRepository<Role> _roleRepository;

        public UserAppService(IRepository<User, long> repository, UserManager userManager, IPasswordHasher<User> passwordHasher, IRepository<Role> roleRepository)
            : base(repository)
        {
            //todo@ismail: move to AbpAuthorize attribute when this is resolved https://github.com/aspnetboilerplate/aspnetboilerplate/issues/2253
            CreatePermissionName
                = GetAllPermissionName
                    = GetPermissionName
                        = UpdatePermissionName
                            = DeletePermissionName = PermissionNames.Pages_Users;

            _userManager = userManager;
            _passwordHasher = passwordHasher;
            _roleRepository = roleRepository;
        }

        public override async Task<UserDto> Create(CreateUserDto input)
        {
            CheckCreatePermission();

            var user = ObjectMapper.Map<User>(input);

            user.TenantId = AbpSession.TenantId;
            user.Password = _passwordHasher.HashPassword(user, input.Password);
            user.IsEmailConfirmed = true;

            CheckErrors(await _userManager.CreateAsync(user));

            if (input.Roles != null)
            {
                CheckErrors(await _userManager.SetRoles(user, input.Roles));
            }

            CurrentUnitOfWork.SaveChanges();

            return MapToEntityDto(user);
        }

        public override async Task<UserDto> Update(UserDto input)
        {
            CheckUpdatePermission();

            var user = await _userManager.GetUserByIdAsync(input.Id);

            MapToEntity(input, user);

            CheckErrors(await _userManager.UpdateAsync(user));

            if (input.Roles != null)
            {
                CheckErrors(await _userManager.SetRoles(user, input.Roles));
            }

            return await Get(input);
        }

        public override async Task Delete(EntityDto<long> input)
        {
            var user = await _userManager.GetUserByIdAsync(input.Id);
            await _userManager.DeleteAsync(user);
        }

        public async Task<ListResultDto<RoleDto>> GetRoles()
        {
            var roles = await _roleRepository.GetAllListAsync();
            return new ListResultDto<RoleDto>(ObjectMapper.Map<List<RoleDto>>(roles));
        }

        protected override User MapToEntity(CreateUserDto createInput)
        {
            var user = ObjectMapper.Map<User>(createInput);
            user.SetNormalizedNames();
            return user;
        }

        protected override void MapToEntity(UserDto input, User user)
        {
            ObjectMapper.Map(input, user);
            user.SetNormalizedNames();
        }

        protected override IQueryable<User> CreateFilteredQuery(FilteredResultRequestDto input)
        {
            var data = Repository.GetAllIncluding(x => x.Roles);

            if (!string.IsNullOrEmpty(input.Filter))
            {
                IList<FilterCriteria> FilterCriteria = new List<FilterCriteria>();
                var SearchCriteria = input.Filter.Split(new string[] {" and "},StringSplitOptions.None);
                foreach (var item in SearchCriteria)
                {
                    if (string.IsNullOrEmpty(item) || string.IsNullOrWhiteSpace(item))
                        continue;
                    string value;
                    var keyValue = item.Split(' ');
                    var index = item.IndexOf('"') + 1;
                    if (index != 0)
                        value = item.Substring(index, item.Length - index - 1);
                    else
                        value = keyValue[2];
                    
                    FilterType fe = GetFilterType(keyValue[1]);
                    var searchItem = new FilterCriteria(keyValue[0],fe, value);
                    FilterCriteria.Add(searchItem);
                }
                var Filtereddata = data.Filter(FilterCriteria);
                return Filtereddata;
            }

            return data;
        }

        protected override async Task<User> GetEntityByIdAsync(long id)
        {
            return await Repository.GetAllIncluding(x => x.Roles).FirstOrDefaultAsync(x => x.Id == id);
        }
        protected virtual void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }


        private FilterType GetFilterType(string filter)
        {
            FilterType fe = new FilterType();
            switch (filter)
            {
                case "eq":
                    fe = FilterType.Equals;
                    break;
                case "ne":
                    fe = FilterType.Equals;
                    break;
                case "gt":
                    fe = FilterType.GreaterThan;
                    break;
                case "ge":
                    fe = FilterType.GreaterOrEquals;
                    break;
                case "lt":
                    fe = FilterType.LessThan;
                    break;
                case "le":
                    fe = FilterType.LessOrEquals;
                    break;
                case "like":
                    fe = FilterType.Like;
                    break;
                default:
                    break;
            }
            return fe;
        }

    }
}