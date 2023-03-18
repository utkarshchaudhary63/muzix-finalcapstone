import { Component } from '@angular/core';

@Component({
  selector: 'app-frequent-quest',
  templateUrl: './frequent-quest.component.html',
  styleUrls: ['./frequent-quest.component.css']
})
export class FrequentQuestComponent 
{

  scrollup()
  {
    window.scroll(0,0);
  }
}
