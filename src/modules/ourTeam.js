'use strict';

function ourTeam() {
    const teamContainer = document.getElementById('command');

    function swapImage(img) {
        const src = img.src;
        const newSrc = img.dataset.img;
        img.dataset.img = src;
        img.src = newSrc;
    }

    function hover(ev) {
        if (ev.target && ev.target.tagName === 'IMG') {
            swapImage(ev.target);
        }
    }

    teamContainer.addEventListener('mouseover', hover);
    teamContainer.addEventListener('mouseout', hover);
}
export default ourTeam;


