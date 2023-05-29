import { Component, OnInit } from '@angular/core';
import { Categories, Category } from '../category';
import { CategoryService } from '../category.service';
import { Course } from '../course';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  categories: Category[] = [];
  selectedCategory: Category = { id: 0, name: 'All courses'};

  constructor(private courseService: CourseService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCourses();
    this.getCategories();
  }

  selectCategory(category: Category): void {
    this.selectedCategory = category;
    if(category.id === 0) {
      this.getCourses();
    } else {
      this.courseService
      .getCoursesByCategory(category.id)
      .subscribe((response) => (this.courses = response.payload))
    }
  }

  getCourses(): void {
    this.courseService
      .getCourses()
      .subscribe((response) => (this.courses = response.payload));
  }

  getCategories(): void {
    this.categoryService
    .getCategories()
    .subscribe((response) => (this.categories = response.payload));
  }
}
