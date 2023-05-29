using Compass.Core.DTO_s;
using Compass.Core.Interfaces;
using Compass.Core.Services;
using Compass.Core.Validation.Course;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Compass.Api.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ICourseService _courseService;
        public CourseController(ICourseService courseService)
        {
            _courseService = courseService;
        }

        [AllowAnonymous]
        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _courseService.GetAll();
            return Ok(result);
        }

        [HttpGet("get-by-category-id")]
        [AllowAnonymous]
        public async Task<IActionResult> GetByCategoryId(int id)
        {
            var result = await _courseService.GetByCategoryId(id);
            return Ok(result);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CourseDto model)
        {
            var validator = new AddCourseValidation();
            var validationResult = await validator.ValidateAsync(model);
            if (validationResult.IsValid)
            {
                var result = await _courseService.Create(model);
                return Ok(result);
            }
            return BadRequest(validationResult.Errors);
        }

        [HttpPost("update")]
        public async Task<IActionResult> Update([FromBody] CourseDto model)
        {
            var result = await _courseService.Update(model);
            return Ok(result);
        }

        [HttpPost("delete")]
        public async Task<IActionResult> Delete([FromBody] int Id)
        {
            var result = await _courseService.Delete(Id);
            return Ok(result);
        }
    }
}
