import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
    
    @Input() rating: number = 0;
    stars: number[] = [];

    ngOnInit() {
        // Create an array representing the stars
        this.stars = new Array(5).fill(0);
    }
}
