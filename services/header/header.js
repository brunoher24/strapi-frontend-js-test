const HEADER_SERVICE = {
    init() {
        let headerIsVisible = false;
        const headerElt = document.getElementById("app-header-top");
        window.addEventListener('scroll', e => {
            if(window.scrollY > 80 && !headerIsVisible) {
                headerIsVisible = true;
                headerElt.classList.remove("animate-disappear-header");
                headerElt.classList.add("animate-appear-header");
            } else if (window.scrollY <= 80 && headerIsVisible) {
                headerIsVisible = false;
                headerElt.classList.remove("animate-appear-header");
                headerElt.classList.add("animate-disappear-header");
            }
        });
    }
}
