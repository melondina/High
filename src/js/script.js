window.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.search__btn').addEventListener('click', function() {
        document.querySelector('.search__menu').classList.toggle('search__menu--active')
    })
    document.querySelector('.search-close').addEventListener('click', function() {
        document.querySelector('.search__menu').classList.toggle('search__menu--active')
    })
});

document.querySelector('.menu__btn').addEventListener('click', function() {
    document.querySelector('.nav').classList.add('nav-active');

    document.querySelector('.nav__item--close').addEventListener('click', function() {
        document.querySelector('.nav').classList.remove('nav-active');
    });
});

ymaps.ready(init);

function init() {
    const mapElem = document.querySelector('#map');
    const myMap = new ymaps.Map(
        "map", {
            center: [55.769383, 37.638521],
            zoom: 14,
            controls: ['geolocationControl', 'zoomControl']
        }, {
            suppressMapOpenBlock: true,
            geolocationControlSize: "large",
            geolocationControlPosition: { top: "200px", right: "20px" },
            geolocationControlFloat: 'none',
            zoomControlSize: "small",
            zoomControlFloat: "none",
            zoomControlPosition: { top: "120px", right: "20px" }
        }
    );
    setTimeout(() => {
        myMap.container.fitToViewport();
    }, 5000);

    const myPlacemark = new ymaps.Placemark(
        [55.769383, 37.638521], {}, {
            iconLayout: "default#image",
            iconImageHref: "img/mark.png",
            iconImageSize: [12, 12],
            iconImageOffset: [-20, -40],
        }
    );

    myMap.geoObjects.add(myPlacemark);
}

document.querySelector('.contacts-address__btn').addEventListener("click", myFunction);

function myFunction() {
    document.querySelector('.contacts-address').style.display = "none";
}

document.addEventListener('DOMContentLoaded', () => {
    new JustValidate('.contacts-form', {
        rules: {
            name: {
                required: true,
                minLength: 2,
                maxLength: 10,
            },
            mail: {
                required: true,
                email: true
            },
        },
        messages: {
            name: 'Недопустимый формат',
            mail: 'Недопустимый формат',
        },
        colorWrong: '#FF3030'
    });
    new JustValidate('.about-form', {
        rules: {
            mail: {
                required: true,
                email: true
            },
        },
        messages: {
            mail: 'Недопустимый формат',
        },
        colorWrong: '#F06666'
    })

});