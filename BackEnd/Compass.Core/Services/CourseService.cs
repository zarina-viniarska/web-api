using AutoMapper;
using Compass.Core.DTO_s;
using Compass.Core.Entities;
using Compass.Core.Entities.Specifications;
using Compass.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Compass.Core.Services
{
    public class CourseService : ICourseService
    {
        private readonly IRepository<Course> _courseRepo;
        private readonly IMapper _mapper;
        public CourseService(IRepository<Course> courseRepo, IMapper mapper)
        {
            _courseRepo = courseRepo;
            _mapper = mapper;
        }

        public async Task<ServiceResponse> Create(CourseDto model)
        {
            var newCourse = _mapper.Map<Course>(model);
            await _courseRepo.Insert(newCourse);
            await _courseRepo.Save();
            return new ServiceResponse
            {
                Success = true,
                Message = "Course is successfully created",
            };
        }

        public async Task<ServiceResponse> Delete(int Id)
        {
            var course = await _courseRepo.GetByID(Id);
            if (course == null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "Course is not found"
                };
            }
            await _courseRepo.Delete(course);
            await _courseRepo.Save();
            return new ServiceResponse
            {
                Success = true,
                Message = "Course is successfully deleted"
            };
        }

        public async Task<ServiceResponse> GetAll()
        {
            var result = await _courseRepo.GetListBySpec(new Courses.GetAll());
            return new ServiceResponse
            {
                Success = true,
                Message = "Courses are loaded successfully",
                Payload = _mapper.Map<List<CourseDto>>(result)
            };
        }

        public async Task<ServiceResponse> GetByCategoryId(int id)
        {
            var courses = await _courseRepo.GetListBySpec(new Courses.GetByCategoryId(id));
            return new ServiceResponse
            {
                Success = true,
                Message = "Courses by category id are loaded successfully",
                Payload = _mapper.Map<List<CourseDto>>(courses),
            };
        }

        public async Task<ServiceResponse> Update(CourseDto model)
        {
            var course = await _courseRepo.GetItemBySpec(new Courses.GetByName(model.Title));
            if (course != null && course.Id != model.Id)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "Another course with such title already exists"
                };
            }
            else
            {
                await _courseRepo.Update(_mapper.Map<Course>(model));
                await _courseRepo.Save();
                return new ServiceResponse
                {
                    Success = true,
                    Message = "Course is successfully updated"
                };
            }
        }
    }
}
