window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY || window.pageYOffset;
    //let scrollPos = window.scrollY;
    console.log("Pos: ",scrollPosition);
    let arrows = document.querySelectorAll(".arrow");
    arrows.forEach((arrow ) => {
        if (scrollPosition <= 20) {
            console.log("show");
            arrow.classList.add("fade-in");
            arrow.classList.remove("fade-out");
        } else {
            console.log("hide");
            arrow.classList.remove("fade-in");
            arrow.classList.add("fade-out");
        }
    })
});