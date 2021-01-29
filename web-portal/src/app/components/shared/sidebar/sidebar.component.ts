import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RxTranslation, translate } from '@rxweb/translate';
@Component({
  selector: 'app-side-bar',
  templateUrl: './sidebar.component.html',
  styleUrls:['./sidebar.component.css']
})
export class SideBarComponent {
  @translate({translationName:'user'}) multilingualContent:{ [key: string]: any; } | any
  title = 'web-portal';
  languageCode = localStorage.getItem('locale');
  constructor(private route: Router,private rxTranslation: RxTranslation) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if(this.languageCode=='en'){
      this.rxTranslation.change(this.languageCode);
  }
  else if(this.languageCode=='es'){
      this.rxTranslation.change(this.languageCode);
  }
  }

}

