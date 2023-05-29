using Compass.Core.AutoMapper;
using Compass.Core.Interfaces;
using Compass.Core.Services;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Compass.Core
{
    public static class ServiceExtensions
    {
        public static void AddCoreServices(this IServiceCollection services)
        {
            // Add user service
            services.AddTransient<UserService>();
            // Add jwt service
            services.AddTransient<JwtService>();
            // Add email service
            services.AddTransient<EmailService>();
            // Add category service
            services.AddTransient<ICategoryService, CategoryService>();
            // Add course service
            services.AddTransient<ICourseService, CourseService>();
        }

        // Add automapper
        public static void AddAutoMapper(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(AutoMapperUserProfile));
            services.AddAutoMapper(typeof(AutoMapperCategoryAndCourseProfile));
        }
    }
}
