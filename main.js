
$(function () {
        const { fromEvent, interval } = rxjs;
        const { map, mergeMap, switchMap, takeUntil, filter, mapTo } = rxjs.operators;

        const BASE_URL = 'https://64f6f6249d7754084952ddc5.mockapi.io/pets';
        const width = 128;
        const animationSpeed = 1000;
        const pause = 3000;
        let currentSlide = 1;

        const $slideContainer = $('#slideContainer');
        const $name = $('#name');
        const $age = $('#age');
        const $price = $('#price');
        const $photo = $('#photo');

        let petsLength;

        function addPet(pet) {
                $slideContainer.append(`
                <li class="pet w-[8rem] h-52 float-left bg-sky-300"> 
                    <img src="${pet.photo}" alt="pet" class="h-32 w-full">
                    <h4 class="text-center">${pet.Breed}</h4>
                    <span>${pet.Price}</span><span>${pet.Age}</span>
                    <button data-id="${pet.id}" id="remove-btn" class="text-rose-600">Delete</button>
                </li>
            `);
        }

        window.rxjs.ajax.ajax(BASE_URL).subscribe(pets => {
                petsLength = pets.response.length;
                pets.response.forEach(addPet);
        });

        const startSlider$ = interval(pause).pipe(
                takeUntil(fromEvent($slideContainer, 'mouseenter'))
        );

        const stopSlider$ = fromEvent($slideContainer, 'mouseleave').pipe(
                switchMap(() => startSlider$)
        );

        startSlider$.subscribe(() => {
                $slideContainer.animate({ 'margin-left': `-=${width}` }, animationSpeed, function () {
                        if (++currentSlide === petsLength - 5) {
                                currentSlide = 1;
                                $slideContainer.css('margin-left', 0);
                        }
                });
        });

        stopSlider$.subscribe();

        fromEvent($('#add-pet'), 'click').pipe(
                map(() => ({
                        Breed: $name.val(),
                        Age: $age.val(),
                        Price: $price.val(),
                        photo: $photo.val()
                })),
                mergeMap(newPet => window.rxjs.ajax.ajax.post(BASE_URL, newPet, { 'Content-Type': 'application/json' }))
        ).subscribe(response => {
                petsLength += 1;
                addPet(response.response);
        });

        fromEvent($slideContainer, 'click').pipe(
                map(event => $(event.target)),
                filter($target => $target.is('#remove-btn')),
                mergeMap($target => {
                        const $li = $target.closest('li');
                        return window.rxjs.ajax.ajax.delete(`${BASE_URL}/${$target.data('id')}`).pipe(
                                mapTo($li)
                        );
                })
        ).subscribe($li => {
                $li.fadeOut(300, function () {
                        $(this).remove();
                });
        });
})
