import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { Movie } from '../../types/movies';

@Component({
  selector: 'app-movie-category',
  standalone: true,
  imports: [MovieCardComponent, CommonModule],
  templateUrl: './movie-category.component.html',
  styleUrl: './movie-category.component.scss'
})
export class MovieCategoryComponent {
  // Input properties are passed from the parent component

  @Input() title = "";  // Accepts the category title from the parent and defaults to an empty string

  @Input() movieList: Movie[] = [];  // Accepts a list of movies as an input, defaulting to an empty array

  // The component doesn't have additional logic here, it simply receives data from the parent component
}

