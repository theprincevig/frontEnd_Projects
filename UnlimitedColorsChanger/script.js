// generate the random color
const randomColor = function() {
    const hex = "0123456789ABCDEF";
    let color = '#';
    for (let index = 0; index < 6; index++) {
        color += hex[Math.floor(Math.random() * 16)];
    }
    return color;
}

let interval;
const startChanginColor = function() {
    if (!interval) {
        interval = setInterval(function() {
            document.body.style.backgroundColor = randomColor();
        }, 1000);
    }
}
document.querySelector("#start").addEventListener('click', startChanginColor);

const stopChanginColor = function() {
    clearInterval(interval);
    interval = null;
}
document.querySelector("#stop").addEventListener('click', stopChanginColor);