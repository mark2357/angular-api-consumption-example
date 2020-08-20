import { Component, OnInit, Input } from '@angular/core';
import { EventData } from '../types/EventData';

@Component({
  selector: 'app-list-tab',
  templateUrl: './list-tab.component.html',
  styleUrls: ['./list-tab.component.scss']
})
export class ListTabComponent implements OnInit {
  @Input() eventsData : Array<EventData>;

  constructor() { }

  ngOnInit(): void {
  }
}
