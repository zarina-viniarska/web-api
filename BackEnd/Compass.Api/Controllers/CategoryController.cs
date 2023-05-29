using Compass.Core.DTO_s;
using Compass.Core.Interfaces;
using Compass.Core.Validation.Category;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Compass.Api.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet("get-all")]
        [AllowAnonymous]
        public async Task<IActionResult> Index()
        {
            var result = await _categoryService.GetAll();
            return Ok(result);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] AddCategoryDto model)
        {
            var validator = new AddCategoryValidation();
            var validationResult = await validator.ValidateAsync(model);
            if(validationResult.IsValid)
            {
                var result = await _categoryService.Insert(model);
                return Ok(result);
            }
            return BadRequest(validationResult);
        }

        [HttpPost("update")]
        public async Task<IActionResult> Update([FromBody] CategoryDto model)
        {
            var result = await _categoryService.Update(model);
            return Ok(result);
        }

        [HttpPost("delete")]
        public async Task<IActionResult> Delete([FromBody] int Id)
        {
            var result = await _categoryService.Delete(Id);
            return Ok(result);
        }
    }
}