using Compass.Core.DTO_s;
using Compass.Core.Entities;
using Compass.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Compass.Core.Interfaces
{
    public interface ICategoryService
    {
        Task<ServiceResponse> GetAll();
        Task<ServiceResponse> Insert(AddCategoryDto model);
        Task<ServiceResponse> Update(CategoryDto model);
        Task<ServiceResponse> Delete(int Id);
    }
}
