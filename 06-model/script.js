'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');


// for(let i = 0; i < btnsOpenModal.length; i++) {
//     console.log(btnsOpenModal[i].addEventListener('click', function(){
//         console.log('Button clicked');
//         modal.classList.remove('hidden');
//         overlay.classList.remove('hidden');
//     }));
// }

// btnCloseModal.addEventListener('click', function() {
//     // modal.classList.add('hidden');
//     // overlay.classList.add('hidden');
//     closeModal();
// });

// overlay.addEventListener('click', function() {
//     // modal.classList.add('hidden');
//     // overlay.classList.add('hidden');
//     closeModal();
// });

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

const openModal = function() {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

for(let i = 0; i < btnsOpenModal.length; i++) {
    btnsOpenModal[i].addEventListener('click', openModal);
}

document.addEventListener('keyup', function(e) {
    // if(e.key == 'Escape') {
    //     if(!modal.classList.contains('hidden')) {
    //         closeModal();
    //     }
    // }

    if(e.key === 'Escape' && !modal.classList.contains('hiddent')){
        closeModal();
    }
})