using Abp.Application.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Abp.Application.Services.Dto;
using Abp.Domain.Entities;
using Abp.Extensions;

namespace Abp.Application.Services
{
    public class AsyncFilteredAppService<TEntity, TEntityDto, TPrimaryKey, TGetAllInput> :
        AsyncFilteredAppService<TEntity, TEntityDto, TPrimaryKey, TGetAllInput, TEntityDto, TEntityDto, EntityDto<TPrimaryKey>, EntityDto<TPrimaryKey>>
           where TEntity : class, IEntity<TPrimaryKey>
           where TEntityDto : IEntityDto<TPrimaryKey>
           where TGetAllInput : IFilteredResultRequest
    {
        public AsyncFilteredAppService(IRepository<TEntity, TPrimaryKey> repository) : base(repository)
        {
        }
    }

    public class AsyncFilteredAppService<TEntity, TEntityDto, TPrimaryKey, TGetAllInput, TCreateInput, TUpdateInput, TGetInput, TDeleteInput> :
        AsyncBaseAppService<TEntity, TEntityDto, TPrimaryKey, TGetAllInput, TCreateInput, TUpdateInput, TGetInput, TDeleteInput>,
        IAsyncCrudAppService<TEntityDto, TPrimaryKey, TGetAllInput, TCreateInput, TUpdateInput, TGetInput, TDeleteInput>
           where TEntity : class, IEntity<TPrimaryKey>
           where TEntityDto : IEntityDto<TPrimaryKey>
           where TUpdateInput : IEntityDto<TPrimaryKey>
           where TGetInput : IEntityDto<TPrimaryKey>
           where TDeleteInput : IEntityDto<TPrimaryKey>
           where TGetAllInput : IFilteredResultRequest
    {
        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="repository"></param>
        public AsyncFilteredAppService(IRepository<TEntity, TPrimaryKey> repository) : base(repository)
        {
            
        }

        protected override IQueryable<TEntity> CreateFilteredQuery(TGetAllInput input)
        {
            var data = CreateQuery();

            if (!string.IsNullOrEmpty(input.Filter))
            {
                IList<FilterCriteria> FilterCriteria = new List<FilterCriteria>();
<<<<<<< HEAD
                var SearchCriteria = input.Filter.Split(new string[] { " and " }, StringSplitOptions.None);
=======
                var SearchCriteria = input.Filter.Split(new string[] { " and " , " or "}, StringSplitOptions.None);
>>>>>>> bdb3ec03b9ad1e2f1973b81e7ee32a94202fceb5
                foreach (var item in SearchCriteria)
                {
                    if (string.IsNullOrEmpty(item) || string.IsNullOrWhiteSpace(item))
                        continue;
                    object value;
                    var keyValue = item.Split(' ');
                    var index = item.IndexOf('"') + 1;
                    if (index != 0)
                        value = item.Substring(index, item.Length - index - 1);
                    else
<<<<<<< HEAD
                        value = keyValue[2] == "null" ? null : keyValue[2];
=======
                        value = keyValue[2] == "null" ? null : String.Join(" ",keyValue,2,keyValue.Length-2);
>>>>>>> bdb3ec03b9ad1e2f1973b81e7ee32a94202fceb5

                    FilterType fe = GetFilterType(keyValue[1]);
                    var searchItem = new FilterCriteria(keyValue[0], fe, value);
                    FilterCriteria.Add(searchItem);
                }
                var Filtereddata = data.Filter(FilterCriteria);
                return Filtereddata;
            }

            return data;
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
