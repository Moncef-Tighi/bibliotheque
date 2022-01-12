function animate(obj, initVal, lastVal, duration) {

    let startTime = null;

    let currentTime = Date.now();

    const step = (currentTime ) => {

        if (!startTime) {
              startTime = currentTime ;
        }

        const progress = Math.min((currentTime  - startTime) / duration, 1);

        obj.innerHTML = Math.floor(progress * (lastVal - initVal) + initVal);
        if (progress < 1) {
              window.requestAnimationFrame(step);
        }
        else{
              window.cancelAnimationFrame(window.requestAnimationFrame(step));
        }
    };
    window.requestAnimationFrame(step);
}

let text1 = document.getElementById('auteurs');
let text2 = document.getElementById('livres');

animate(text1, 0, 36580, 6000);
animate(text2, 0, 98732, 8000);
