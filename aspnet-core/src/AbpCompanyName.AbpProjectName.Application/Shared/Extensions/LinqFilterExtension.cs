using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Abp.Extensions
{
    public static class LinqFilterExtensions
    {
        public static IQueryable<T> Filter<T>(this IQueryable<T> query, IEnumerable<FilterCriteria> filterCriteria)
        {
            if (filterCriteria != null)
            {
                foreach (var item in filterCriteria)
                {
                    query = query.Filter(item.FilterName, GetPropertyType<T>(item.FilterName), item.FilterType, item.FilterValue);
                }
                return query;
            }

            return query;
        }

        public static IQueryable<T> Filter<T>(this IQueryable<T> query, string fieldName, Type fieldType,
            FilterType fieldOp, object fieldValue)
        {
            ParameterExpression c = Expression.Parameter(typeof(T), "b");
            object objValue = ChangeType(fieldValue, fieldType);

            Expression fieldExpression;
            switch (fieldOp)
            {
                case FilterType.Equals:
                    fieldExpression = Expression.Equal(Expression.Property(c, fieldName), Expression.Constant(objValue, fieldType));
                    break;
                case FilterType.NotEquals:
                    fieldExpression = Expression.NotEqual(Expression.Property(c, fieldName), Expression.Constant(objValue, fieldType));
                    break;
                case FilterType.GreaterThan:
                    fieldExpression = Expression.GreaterThan(Expression.Property(c, fieldName), Expression.Constant(objValue, fieldType));
                    break;
                case FilterType.GreaterOrEquals:
                    fieldExpression = Expression.GreaterThanOrEqual(Expression.Property(c, fieldName), Expression.Constant(objValue, fieldType));
                    break;
                case FilterType.LessOrEquals:
                    fieldExpression = Expression.LessThanOrEqual(Expression.Property(c, fieldName), Expression.Constant(objValue, fieldType));
                    break;
                case FilterType.LessThan:
                    fieldExpression = Expression.LessThan(Expression.Property(c, fieldName), Expression.Constant(objValue, fieldType));
                    break;
                case FilterType.Like:
                    fieldExpression = Expression.Call(Expression.Property(c, fieldName), StringContainsMethod, Expression.Constant(objValue, fieldType));
                    break;
                default:
                    throw new Exception("Invalid Operation");

            }
            Expression<Func<T, bool>> IsFieldExpression = Expression.Lambda<Func<T, bool>>(fieldExpression, c);

            query = query.Where(IsFieldExpression);
            return query;
        }
      
        public static IEnumerable<TSource> DistinctBy<TSource, TKey>(this IEnumerable<TSource> source, Func<TSource, TKey> keySelector)
        {
            HashSet<TKey> seenKeys = new HashSet<TKey>();
            foreach (TSource element in source)
            {
                if (seenKeys.Add(keySelector(element)))
                {
                    yield return element;
                }
            }
            //ToUse: var query = people.DistinctBy(p => p.Id);
            //ToUse multiple properties: var query = people.DistinctBy(p => new { p.Id, p.Name });
        }
        #region ## HELPER FUNCTION ##
        private static Type GetPropertyType<T>(string propertyName)
        {
            //var type = typeof(T);
            //var property = type.GetProperty(propertyName);
            //return property.PropertyType;

            string[] props = propertyName.Split('.');
            Type propertyType = typeof(T);

            foreach (string prop in props)
            {
                PropertyInfo pi = propertyType.GetProperty(prop);
                propertyType = pi.PropertyType;
            }
            return propertyType;
        }

        private static object ChangeType(object value, Type conversionType)
        {

            if (conversionType == null)
            {
                throw new ArgumentNullException("conversionType");
            }

            if (conversionType.IsConstructedGenericType && conversionType.GetGenericTypeDefinition().Equals(typeof(Nullable<>)))
            {
                if (value == null)
                {
                    return null;
                }
                NullableConverter nullableConverter = new NullableConverter(conversionType);
                conversionType = nullableConverter.UnderlyingType;
            }
            return Convert.ChangeType((conversionType.FullName == "System.Guid") ? Guid.Parse(value.ToString()) : value, conversionType, CultureInfo.InvariantCulture);
        }

        #endregion

        #region ## Propertires ##

        private static readonly MethodInfo StringContainsMethod = typeof(string).GetRuntimeMethod(@"Contains", new[] { typeof(string) });

        #endregion


    }

    public class FilterCriteria
    {
        #region #Property#
        public string FilterName { set; get; }
        public FilterType FilterType { set; get; }
        public object FilterValue { set; get; }
        public object FilterValue2 { set; get; }
        public string FilterDataType { set; get; }
        #endregion

        #region #Constractors#
        public FilterCriteria(string filterName, FilterType filterType, object filterValue, object filterValue2 = null, string filterDataType = null)
        {
            FilterName = filterName;
            FilterType = filterType;
            FilterValue = filterValue;
            FilterValue2 = filterValue2;
            FilterDataType = filterDataType;
        }

        #endregion
    }

    public enum FilterType
    {
        Between,
        GreaterOrEquals,
        GreaterThan,
        LessOrEquals,
        LessThan,
        Equals,
        NotEquals,
        Like,
        NotLike,
        IsNull
    }
}
