
$(function () {

        let width = 128;
        let animationSpeed = 1000;
        let pause = 3000;
        let currentSlide = 1;

        let $slideContainer = $('#slideContainer');
        let $name = $('#name');
        let $age = $('#age');
        let $price = $('#price');
        let $photo = $('#photo');

        let petsLength;
        let interval;

        function startSlider() {
                interval = setInterval(function () {
                        $slideContainer.animate({ 'margin-left': '-=' + width }, animationSpeed, function () {
                                if (++currentSlide === petsLength - 5) {
                                        currentSlide = 1;
                                        $slideContainer.css('margin-left', 0);
                                }
                        });
                }, pause);
        }
        function pauseSlider() {
                clearInterval(interval);
        }

        $slideContainer
                .on('mouseenter', pauseSlider)
                .on('mouseleave', startSlider);

        startSlider();

        function addPet(pet) {
                $slideContainer.append(`<li class="pet w-[8rem] h-52 float-left bg-sky-300"> 
                                <img src="${pet.photo}" alt="pet" class="h-32 w-full">
                                <h4 class="text-center">${pet.Breed}</h4>
                                <span>${pet.Price}</span><span>${pet.Age}</span>
                                <button data-id="${pet.id}" id="remove-btn" class="text-rose-600" >Delete</button>
                                </li>`)
        }

        $.ajax({
                type: 'GET',
                url: 'https://64f6f6249d7754084952ddc5.mockapi.io/pets',
                success: function (pets) {
                        $.each(pets, function (i, pet) {
                                petsLength = pets.length
                                addPet(pet)
                        })
                }
        })

        $('#add-pet').on('click', function () {
                let newPet = {
                        Breed: $name.val(),
                        Age: $age.val(),
                        Price: $price.val(),
                        photo: $photo.val()
                }
                $.ajax({
                        type: 'POST',
                        url: 'https://64f6f6249d7754084952ddc5.mockapi.io/pets',
                        data: newPet,
                        success: function (newPet) {
                                petsLength += 1
                                addPet(newPet)
                        }
                })
        })

        $slideContainer.delegate('#remove-btn', 'click', function () {
                let $li = $(this).closest('li');
                $.ajax({
                        type: 'DELETE',
                        url: 'https://64f6f6249d7754084952ddc5.mockapi.io/pets/' + $(this).attr('data-id'),
                        success: function () {
                                $li.fadeOut(300, function () {
                                        $(this).remove();
                                })
                        }
                })
        })
})
