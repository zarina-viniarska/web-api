﻿using Compass.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Compass.Infrastructure.DbInitializers
{
    internal static class CategoryAndCourseInitializer
    {
        public static void SeedCategories(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>().HasData(new Category[]
            {
                new Category() { Id = 1, Name = "Programming" },
                new Category() { Id = 2, Name = "UI/UX" },
                new Category() { Id = 3, Name = "FrontEnd" },
                new Category() { Id = 4, Name = "System programming" }
            });
        }

        public static void SeedCourses(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Course>().HasData(new Course[]
            {
                new Course()
                {
                    Id = 1,
                    Title = "C++ Basics",
                    Description="Description C++ Basics",
                    Price = 900.0m,
                    CategoryId = 1
                },
                new Course()
                  {
                    Id = 2,
                    Title = "C++ Advanced",
                    Description="Description C++ Advanced",
                    Price = 910.0m,
                    CategoryId = 1,
                },
                new Course()
                {
                    Id = 3,
                    Title = "Figma",
                    Description="Description Figma",
                    Price = 1500.0m,
                    CategoryId =2
                },
                new Course()
                {
                    Id = 4,
                    Title = "HTML/CSS/JavaScript",
                    Description="Description HTML/CSS/JavaScript",
                    Price = 1850.0m,
                    CategoryId =3
                }
            });
        }
    }
}