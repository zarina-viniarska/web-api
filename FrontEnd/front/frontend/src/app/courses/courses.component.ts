import { Component, OnInit } from '@angular/core';
import { Categories, Category } from '../category';
import { Course } from '../course';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  categories: Category[] = Categories;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void {
    this.courseService
      .getCourses()
      .subscribe((response) => (this.courses = response.payload));
    console.log(this.courses);
  }
}
