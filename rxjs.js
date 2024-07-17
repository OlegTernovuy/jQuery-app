//Create
// const observable = window.rxjs.Observable.create((observe) => {
//         observe.next('hello')
// });

//fromEvent
// const observable = window.rxjs.fromEvent(document, 'click');

//Interval
// const observable = window.rxjs.interval(1000)

//Of
// const observable = window.rxjs.of('test', {id: 1}, ['my', 'name'], 12, true)

//Cold
// const observable = window.rxjs.Observable.create((observe) => {
//         observe.next( Math.random() )
// });

// observable.subscribe((val) => console.log(val));
// observable.subscribe((anVal) => console.log(anVal));

//Completion
// const observable = window.rxjs.interval(200)

// const example = observable.pipe(
//         window.rxjs.take(5),
//         window.rxjs.finalize(() => console.log('Sequence complete'))
//       )

// const subscribe = example.subscribe((val) => console.log(val));

//map
// const observable = window.rxjs.of('{"id": 1, "name": "Bob"}')
// observable.pipe(window.rxjs.map((json) => JSON.parse(json))).subscribe((val) => console.log(val.id, val.name));

//tap
// const observable = window.rxjs.of('oleh', 'ternovyi')
// const example = observable.pipe(
//         window.rxjs.tap((val) => console.log(`BEFORE MAP: ${val}`)),
//         window.rxjs.map((val) => val.toUpperCase()),
//         window.rxjs.tap((val) => console.log(`BEFORE MAP: ${val}`))
// ).subscribe()

//filters, first, last
// const observable = window.rxjs.of(1, 3, -2, 4, -5, -6, -7, 9)
// observable.pipe(window.rxjs.filter((val) => val > 0)).subscribe((val) => console.log(val));
// observable.pipe(window.rxjs.last()).subscribe((val) => console.log(val));

//debounce, throttle
// const observable = window.rxjs.fromEvent(document, 'mousemove');
// observable.pipe(window.rxjs.throttleTime(1000)).subscribe((val) => console.log(val.type));
// observable.pipe(window.rxjs.debounceTime(1000)).subscribe((val) => console.log(val.type));

//scan
// const source = window.rxjs.of(1, 2, 3);
// const example = source.pipe(window.rxjs.scan((acc, curr) => acc + curr, 0));
// const subscribe = example.subscribe(val => console.log(val));

//switchMap
// window.rxjs.fromEvent(document, 'click')
//         .pipe(
//                 window.rxjs.switchMap(() => window.rxjs.interval(1000))
//         )
//         .subscribe(console.log);

//takeWhile
// const source$ = window.rxjs.of(1, 2, 3, 9);
// source$
//   .pipe(window.rxjs.takeWhile(val => val <= 3))
//   .subscribe(console.log);

//zip
// const eventTime = eventName =>
//         window.rxjs.fromEvent(document, eventName).pipe(window.rxjs.map(() => new Date()));

//       const mouseClickDuration = window.rxjs.zip(
//         eventTime('mousedown'),
//         eventTime('mouseup')
//       ).pipe(window.rxjs.map(([start, end]) => Math.abs(start.getTime() - end.getTime())));

//       mouseClickDuration.subscribe(console.log);

//catch
// const myBadPromise = () =>
//         new Promise((resolve, reject) => reject('Rejected!'));
// const source = window.rxjs.timer(1000);
// const example = source.pipe(
//         window.rxjs.mergeMap(_ =>
//                 window.rxjs.from(myBadPromise()).pipe(window.rxjs.catchError(error => window.rxjs.of(`Bad Promise: ${error}`)))
//         )
// );
// const subscribe = example.subscribe(val => console.log(val));

//retry
// const myBadPromise = () =>
//         new Promise((resolve, reject) => reject('Rejected!'));
// const source = window.rxjs.timer(1000);
// const example = source.pipe(
//         window.rxjs.mergeMap(_ =>
//                 window.rxjs.from(myBadPromise())
//         ), window.rxjs.retry(3)
// );
// const subscribe = example.subscribe({
//         next: val => console.log(val),
//         error: val => console.log(`${val}: Retried 2 times then quit!`)
// });

//subscribe
// const sub = new window.rxjs.Subject();

// sub.subscribe(x => {
//   console.log('Subscriber A', x);
// });
// sub.subscribe(x => {
//   console.log('Subscriber B', x);
// });

// sub.next(1);
// sub.next(2);

//async subscribe
// const sub = new window.rxjs.AsyncSubject();

// sub.subscribe(x => {
//   console.log('Subscriber A', x);
// });
// sub.next(1);
// sub.subscribe(x => {
//   console.log('Subscriber B', x);
// });

// sub.next(2);
// sub.next(3);
// sub.complete();

// const githubUsers = `https://api.github.com/users?per_page=2`;

// const users = window.rxjs.ajax.ajax(githubUsers);

// const subscribe = users.subscribe(
//   res => console.log(res),
//   err => console.error(err)
// );

// const subscribe = observable.subscribe((val) => console.log(val));