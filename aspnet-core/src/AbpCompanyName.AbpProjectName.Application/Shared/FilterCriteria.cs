using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AbpCompanyName.AbpProjectName.Shared
{
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
}
