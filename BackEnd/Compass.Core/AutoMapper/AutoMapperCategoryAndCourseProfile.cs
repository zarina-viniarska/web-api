using AutoMapper;
using Compass.Core.DTO_s;
using Compass.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Compass.Core.AutoMapper
{
    public class AutoMapperCategoryAndCourseProfile : Profile
    {
        public AutoMapperCategoryAndCourseProfile()
        {
            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<Category, AddCategoryDto>().ReverseMap();
            CreateMap<CourseDto, Course>().ReverseMap();
        }
    }
}
