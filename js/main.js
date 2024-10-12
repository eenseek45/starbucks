//console.log('JS');

const searchEl = document.querySelector('.search'); // 검색요소
//const searchInputEl = document.querySelector('.search input'); // 입력요소
const searchInputEl = searchEl.querySelector('input');

// 검색요소를 클릭하면 입력에 포커스
searchEl.addEventListener('click', function () {
    searchInputEl.focus(); 
});

searchInputEl.addEventListener('focus', function() {
    searchEl.classList.add('focused'); /* focused 클래스 내용 추가 */
    searchInputEl.setAttribute('placeholder', '통합겸색'); /* html의 속성 추가 */
});

// blue(포커스)가 해제되면
searchInputEl.addEventListener('blur', function() {
    searchEl.classList.remove('focused'); /* focused 클래스 내용 추가 */
    searchInputEl.setAttribute('placeholder', ''); /* html의 속성 추가 */
});

const badgeEL = document.querySelector('header .badges');

// 화면 자체에 스크롤 추가
// 0.3초 단위로 스로틀링을 주고 실행해서 부하를 줄여준다.
const toTopEl = document.querySelector('#to-top');

window.addEventListener('scroll', _.throttle(function() {
    //console.log(window.scrollY);
    if(window.scrollY > 500) {
        // 배지숨기기
        // gsap.to(요소, 지속시간(초), 옵션);
        // 0.6초 동안 애니메니션 처리-> 투명해지도록
        gsap.to(badgeEL, 0.6, {
            opacity: 0,
            display: 'none' /* 화면에서도 없앤다. */
        });
        //badgeEL.style.display = 'none';
        // 처음으로 버튼보이기!
        gsap.to(toTopEl, .2, {
            x: 0, /* x이동 */ 
        });
    }
    else {
        // 배지 보이기
        //badgeEL.style.display = 'block';
        gsap.to(badgeEL, 0.6, {
            opacity: 1,
            display: 'block'
        });

        // 처음으로 버튼숨기기!
        gsap.to(toTopEl, .2, {
            x: 100, /* 현재위치에서 오른쪽으로 100이동 하므로 안보임 */ 
        });
    }
}, 300));

// 상단으로 스크롤 버튼을 클릭하면,
toTopEl.addEventListener('click', function () {
    // 페이지 위치를 최상단으로 부드럽게(0.7초 동안) 이동.
    gsap.to(window, .7, {
      scrollTo: 0
    });
});

// fade-in 전부 찾고 애니메이션 효과
const fadeEls = document.querySelectorAll('.visual .fade-in');

// 인수개수만큼 호출
fadeEls.forEach(function (fadeEL, index) {
    gsap.to(fadeEL, 1, {
        delay: (index + 1) * .7,      /* 지연시간, index를 안주면 묶음이 같이 움직인다. */
        opacity: 1      /* 투명도없음 */
    });
});

// swiper 실행
new Swiper('.notice-line .swiper-container', {
    direction: 'vertical',
    autoplay: true,
    loop: true /* 반복재생여부 */
});

new Swiper('.promotion .swiper-container', {
    /* direction: 'horizantal', */
    slidesPerView: 3, // 한번에 보여줄 슬라이드 개수
    spaceBetween: 10, // 슬라이드 사이 여백
    centeredSlides: true, // 1번 슬라이드가 가운데 보이기
    loop: true,       /* 반복재생여부 */
    autoplay: {
        delay: 3000   // 3초마다 한번씩 */
    },
    pagination: {
        el: '.promotion .swiper-pagination', // 페이지번호요소선택자
        clickable: true // 사용자의 페이지 선택 가능 여부
    },
    navigation: {
        prevEl: '.promotion .swiper-prev', // 이전슬라이드
        nextEl: '.promotion .swiper-next'  // 다음슬라이드
    }
});

new Swiper('.awards .swiper-container', {
    // direction: 'horizontal',
    autoplay: true,
    loop: true,
    spaceBetween: 30,
    slidesPerView: 5,
    
    navigation: {
        prevEl: '.awards .swiper-prev', // 이전슬라이드
        nextEl: '.awards .swiper-next'  // 다음슬라이드
    }
});

const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');

let isHidePromotion = false;

promotionToggleBtn.addEventListener('click', function() {
    isHidePromotion = !isHidePromotion; // true로 초기화

    if(isHidePromotion) {
        // 숨김처리!
//console.log('hide!!!');
        promotionEl.classList.add('hide');
    }
    else {
        // 보임처리!
//console.log('visual!!!');        
        promotionEl.classList.remove('hide');
    }
});

// 범위랜덤함수
function random(min, max) {
    return parseFloat( (Math.random() * (max - min) + min).toFixed(2) );
}

function floatingObject(selector, delay, size) {
    gsap.to(
        //요소
        //시간
        //옵션
        selector, // 선택자
        random(1.5, 2.5), // 애니메이션 동작 시간
        {
            y: size, // y축 움직임
            repeat: -1, // 무한반복
            yoyo: true, // 한번 재생된 후 뒤로 재생 (반복)
            ease: Power1.easeInOut,
            delay: random(0, delay),
        }
    );
}

floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

// 요소찾기
// 스크롤에 따라 요소가 보이는지 확인
const spyEls = document.querySelectorAll('section.scroll-spy');

// 요소를 돌면서 
spyEls.forEach( function(spyEl) {
    /* Class-> html의 클래스 속성 */
    /* ScrollMagic 추가 */
    /* 메소드 체이닝 형태 */
    new ScrollMagic
        .Scene({
            triggerElement: spyEl, /* 보여짐 여부를 감시하는 요소 */
            triggerHook: .8,       /* 뷰포트 시작 부분 :0, 끝부분:1, 스크롤이 .8 위치에 있다면. */

        })
        .setClassToggle(spyEl, 'show'). /* 토글할 요소 */
        addTo(new ScrollMagic.Controller()); /* 실제 동작할 수 있는 구조로 알려줌 */
});

const thisYear = document.querySelector('.this-year');
// 글자내용에 값을 지정한다.
// 자바스크립트 생성자 함수
// thisYear가 있는 클래스를 가지는 요소에 값을 넣어준다.
thisYear.textContent = new Date().getFullYear(); // 2021