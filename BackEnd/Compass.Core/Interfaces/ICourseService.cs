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
    public interface ICourseService
    {
        Task<ServiceResponse> GetAll();
        Task<ServiceResponse> GetByCategoryId(int id);
        Task<ServiceResponse> Create(CourseDto model);
        Task<ServiceResponse> Update(CourseDto model);
        Task<ServiceResponse> Delete(int id);
    }
}
