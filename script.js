// Enough Handson - RxJS
// Part 4

console.log('---------- Operator map over data streams-------------');


const intervalWithMap$ = Rx.Observable.interval(50).take(10).map( v => v * v);

intervalWithMap$.subscribe(
  value => {
    console.log('Map 1:',value);
  },
  error => {
    console.log(error);
  },
  complete =>{
    console.log(complete);
  }
);

console.log('---------- Operator map over data streams (interval to object)-------------');

const intervalWithMapToObject$ = Rx.Observable.interval(50).take(10).map( v => v * v);

intervalWithMapToObject$.map(v => {  return { value: v } })
          .subscribe(
            value => { console.log(value) },
            error => { console.log(error) },
            complete => { console.log(complete) }
          );

console.log('---------- Operator map (click stream to value)-------------');

const clickButton = document.getElementById('btnClick');

const click$ = Rx.Observable.fromEvent(clickButton, 'click')
                            .map(event => {
                              return { x: event.clientX, y: event.clientY }
                            });

click$.subscribe(
  value => { console.log(value) },
  error => { console.log(error) },
  complete => { console.log(complete) }
);

console.log('---------- Operator map (click stream to value - map over a map)-------------');

click$.map(event => event.x * event.y )
      .subscribe(
        value => { console.log(value) },
        error => { console.log(error) },
        complete => { console.log(complete) }
      );

console.log('---------- Operator pluck-------------');

const talks = [
  { speaker: 'John', talk: 'I am One with Angular', duration: 25, isWorkshop: false },
  { speaker: 'Rob', talk: 'Everything is a stream', duration: 25, isWorkshop: false },
  { speaker: 'Stephen', talk: 'Angular CLI', duration: 60, isWorkshop: true },
  { speaker: 'Brad', talk: 'Angular 5 and beyond', duration: 25, isWorkshop: false },
  { speaker: 'Ben', talk: 'What the RxJS', duration: 120, isWorkshop: true },
];

const talks$ = Rx.Observable.from(talks);

talks$.subscribe(
    value => { console.log(value) },
    error => { console.log(error) },
    complete => { console.log(complete) }
  );

console.log('--List of speakers--');

talks$.pluck('speaker').subscribe(
  value => { console.log(value) },
  error => { console.log(error) },
  complete => { console.log(complete) }
);

console.log('--List of talks--');

talks$.pluck('talk').subscribe(
  value => { console.log(value) },
  error => { console.log(error) },
  complete => { console.log(complete) }
);

console.log('--List of Workshops ( speaker + workshop name + duration--');

talks$.filter(talk => {
    return talk.isWorkshop === true;
  })
  .subscribe(
  value => { console.log(value) },
  error => { console.log(error) },
  complete => { console.log(complete) }
);

// Q: How to pluck multiple properties from a object stream