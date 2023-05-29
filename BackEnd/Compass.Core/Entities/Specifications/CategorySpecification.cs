using Ardalis.Specification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Compass.Core.Entities.Specifications
{
    public static class Categories
    {
        public class GetByName : Specification<Category>
        {
            public GetByName(string name)
            {
                Query.Where(x => x.Name == name);
            }
        }
    }
}
