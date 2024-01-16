import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.css']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy{

  img: string = '';

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('img')
  set changeImg(newImg: string) {
    this.img = newImg;
    console.log('change just img  =>' ,this.img);
    // code
  }


  @Input() alt: string = '';
  @Output() loaded = new EventEmitter<string>();
  imageDefault = './assets/images/sinDatoDeImagen.jpg';
//  counter = 0;
//  counterFn: number | undefined;

  constructor(){
    //before render
    console.log('constructor', 'imagValue =>', this.img);
  }

  ngOnChanges(changes: SimpleChanges){
    //before render
    console.log('ngOnChanges', 'imgValue =>', this.img);
    console.log('cahnges', changes);
  }

  ngOnInit(): void {
    //before render
    console.log('ngOnInit', 'imgValue =>', this.img);
//    this.counterFn = window.setInterval(()=>{
//      this.counter += 1;
//      console.log('run counter');
//    }, 1000);
  }

  ngAfterViewInit(){
    //after render
    //hadle children
    console.log('ngAfterViewInit');
  }

  ngOnDestroy(){
    //delete
    console.log('ngOnDestroy');
    //window.clearInterval(this.counterFn);
  }

  imgError(){
    this.img = this.imageDefault;
  }

  imgLoaded(){
    console.log('Log hijo');
    this.loaded.emit(this.img);
  }

}
