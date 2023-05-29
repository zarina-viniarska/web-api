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
    public class CategoryService : ICategoryService
    {
        private readonly IRepository<Category> _categoryRepo;
        private readonly IRepository<Course> _courseRepo;
        private readonly IMapper _mapper;
        public CategoryService(IRepository<Category> categoryRepo, IRepository<Course> courseRepo, IMapper mapper)
        {
            _categoryRepo = categoryRepo;
            _courseRepo = courseRepo;
            _mapper = mapper;
        }

        public async Task<ServiceResponse> GetAll()
        {
            var result = await _categoryRepo.GetAll();
            return new ServiceResponse {
                Success = true,
                Message = "Categories are successfully loaded",
                Payload = _mapper.Map<List<CategoryDto>>(result),
            };
        }

        public async Task<ServiceResponse> Insert(AddCategoryDto model)
        {
            var result = await _categoryRepo.GetItemBySpec(new Categories.GetByName(model.Name));
            if(result == null)
            {
                Category category = _mapper.Map<Category>(model);
                await _categoryRepo.Insert(category);
                await _categoryRepo.Save();
                return new ServiceResponse
                {
                    Success = true,
                    Message = "Category is successfully created"
                };
            }
            else
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "Category with such name already exists"
                };
            }
            
        }

        public async Task<ServiceResponse> Update(CategoryDto model)
        {
            var category = await _categoryRepo.GetItemBySpec(new Categories.GetByName(model.Name));
            if(category != null && category.Id != model.Id)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "Another category with such name already exists"
                };
            }
            else
            {
                await _categoryRepo.Update(_mapper.Map<Category>(model));
                await _categoryRepo.Save();
                return new ServiceResponse
                {
                    Success = true,
                    Message = "Category is successfully updated"
                };
            }
        }

        public async Task<ServiceResponse> Delete(int Id)
        {
            var category = await _categoryRepo.GetByID(Id);
            if (category == null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "Category is not found"
                };
            }
            var courses = await _courseRepo.GetListBySpec(new Courses.GetByCategoryId(Id));
            if(courses.Count() == 0)
            {
                await _categoryRepo.Delete(category);
                await _categoryRepo.Save();
                return new ServiceResponse
                {
                    Success = true,
                    Message = "Category is successfully deleted"
                };
            }
            return new ServiceResponse
            {
                Success = false,
                Message = "Category cannot be deleted. Change courses in it first",
                Payload = _mapper.Map<List<CourseDto>>(courses)
            };
        }
    }
}