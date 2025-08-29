// Simple smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Netflix-style Projects Carousel
let currentIndex = 0;



function scrollProjects(direction) {
    const track = document.getElementById("projectsTrack");
    const totalProjects = track.children.length;
    const visibleProjects = 3;

    // max index so last 3 fit in screen
    const maxIndex = totalProjects - visibleProjects;

    currentIndex += direction;

    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    const projectWidth = track.children[0].offsetWidth + 20; // width + margin
    track.style.transform = `translateX(-${currentIndex * projectWidth}px)`;
}
