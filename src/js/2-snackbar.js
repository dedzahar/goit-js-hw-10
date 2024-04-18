import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", event => {
    event.preventDefault();
    const delay = event.target.elements.delay.value;
    const state = event.target.elements.state.value;
    const isSuccess = state === 'fulfilled';
    generatePromise(isSuccess, delay);
});

function generatePromise(isSuccess, delay) {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isSuccess) {
                resolve(`✅ Fulfilled promise in ${delay}ms`);
            } else {
                reject(`❌ Rejected promise in ${delay}ms`);
            }
        }, delay);
    }).then(value => iziToast.show(createFulfilledMsg(value))
    ).catch(error => iziToast.show(createRejectedMsg(error))
    );
};

function createFulfilledMsg(value) {
    return {
        message: value,
        messageColor: '#fff',
        backgroundColor: '#59A10D',
        position: 'topRight',
    }
}

function createRejectedMsg(value) {
    return {
        message: value,
        messageColor: '#fff',
        backgroundColor: '#EF4040',
        position: 'topRight',
    }
}

