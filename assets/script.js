const trackMouce = (() => {
    const pointer = document.getElementById('pointer');
    const off = 50;
    let first = !0;

    const mouseX = (evt) => {
        if (!evt)
            evt = window.event;
        if (evt.pageX)
            return evt.pageX;
        else if (evt.clientX)
            return evt.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
        else
            return 0
    };
    const mouseY = (evt) => {
        if (!evt)
            evt = window.event;
        if (evt.pageY)
            return evt.pageY;
        else if (evt.clientY)
            return evt.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
        else
            return 0
    };

    document.onmousemove = (evt) => {
        if (first) {
            first = !1;
            pointer.style.opacity = '1';
        }
        TweenMax.to(pointer, .7, {
            left: (parseInt(mouseX(evt)) - off) + 'px',
            top: (parseInt(mouseY(evt)) - off) + 'px',
            ease: Power3.easeOut
        });
    };
    const links = document.getElementsByTagName('a');

    Array.from(links).forEach(link => {
        link.onmouseover = () => {
            if (!pointer.classList.contains('hide')) {
                pointer.classList.add('hide');
            }
        };

        link.onmouseout = () => pointer.classList.remove('hide');
    });
})();

const backgroundText = (() => {
    const target = document.getElementById('background-text');
    let prevScrollTop = 0;

    document.onscroll = () => {
        const scrollTop = document.documentElement.scrollTop;
        const isForwardScroll = scrollTop > prevScrollTop;
        const left = isForwardScroll ? target.offsetLeft - scrollTop / 10 : target.offsetLeft + scrollTop / 10;
        const top = isForwardScroll ? target.offsetTop - scrollTop / 5 : target.offsetTop + scrollTop / 5;
        const textLeft = isForwardScroll ? -scrollTop / 10 : scrollTop / 10;

        prevScrollTop = scrollTop;

        TweenMax.to(target, .7, {
            left,
            top,
            extShadow: `${textLeft}px 0px 34px rgba(0, 0, 0, .2)`,
            ease: Power3.easeOut
        });
    };
})();

const contactUsButton = (() => {
    const target = document.getElementsByClassName('contact-us-button')[0];
    const footer = document.getElementsByClassName('footer')[0];

    if (target && footer) {
        target.addEventListener('click', () => {
            const isTop = document.documentElement.scrollTop < footer.offsetHeight;

            window.scroll({top: isTop ? footer.offsetHeight : 0, left: 0, behavior: 'smooth' });
        });
    }
})();
