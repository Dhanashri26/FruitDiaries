import { Component,ElementRef, ViewChild, afterNextRender } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent {
  
  logme(){
    console.log("clicked")
  }

}
