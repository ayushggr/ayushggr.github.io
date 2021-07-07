var navMenuAnchorTags = document.querySelectorAll('#body-header nav ul li a');

for (var i = 0; i < navMenuAnchorTags.length; i++) {
    navMenuAnchorTags[i].addEventListener('click', function(event){
        event.preventDefault();
        let targetSectionID = this.textContent.trim().toLowerCase();
        // console.log(targetSectionID);
        let targetSection = document.getElementById(targetSectionID);
        let interval = setInterval(function(){
            let targetSectionCoordinates = targetSection.getBoundingClientRect();
            if (targetSectionCoordinates.top <= 0) {
                clearInterval(interval);
                return;
            }
            window.scrollBy(0, 50);
        }, 10);
    });
}

var progressBars = document.querySelectorAll('#skills-progress div');
window.addEventListener('scroll', checkScroll);

function initializeBar(bar) {
    bar.setAttribute("data-visited", false);
    bar.style.width = 0 + '%';
}
function fillBar(bar) {
    let currentWidth = 0;
    let targetWidth = bar.getAttribute("data-bar-width");
    let interval = setInterval(function () {
        if (currentWidth >= targetWidth) {
            clearInterval(interval);
            return;
        }
        currentWidth++;
        bar.style.width = currentWidth + '%';
    }, 5);
}
for (var bar of progressBars) {
    initializeBar(bar);
}
function checkScroll() {
    for (let bar of progressBars) {
        let barCoordinates = bar.getBoundingClientRect();
        if ((bar.getAttribute("data-visited") == "false") && (barCoordinates.top <= (window.innerHeight - barCoordinates.height))) {
            bar.setAttribute("data-visited", true);
            fillBar(bar);
        } else if (barCoordinates.top > window.innerHeight) {
            bar.setAttribute("data-visited", false);
            initializeBar(bar);
        }
    }
}