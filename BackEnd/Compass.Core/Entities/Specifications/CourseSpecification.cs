using Ardalis.Specification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Compass.Core.Entities.Specifications
{
    public static class Courses
    {
        public class GetAll : Specification<Course>
        {
            public GetAll()
            {
                Query.Include(x => x.Category);
            }
        }

        public class GetByName : Specification<Course>
        {
            public GetByName(string title)
            {
                Query.Where(x => x.Title == title);
            }
        }

        public class GetByCategoryId : Specification<Course>
        {
            public GetByCategoryId(int categoryId)
            {
                Query.Where(x => x.CategoryId == categoryId).Include(x => x.Category);
            }
        }
    }
}
