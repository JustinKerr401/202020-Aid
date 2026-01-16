

const button = document.getElementById("activator")
const timeDisplay = document.getElementById("time")
const breakDisplay = document.getElementById("breaks")
const audio = new Audio("time up.mp3")

let state = 0   //0 means the app hasn't started, 1 is the 20 minutes of screen time, and 2 is the break
let breakCounter = 0

function shift(){
    switch (state){
        case 0:
            state = 1    
            button.textContent = "Screen time"
            button.style.backgroundColor = "hsl(0, 0%, 50%)"
            countDown(Date.now())
            break
        case 1:
            break
        case 2:
            audio.play()
            state = 0
            button.textContent = "Time for a break: look at something in the distance for a bit"
            button.style.backgroundColor = "hsl(0, 0%, 70%)"
            breakCounter++
            breakDisplay.textContent = `${breakCounter} breaks`
            break
    }
}

function countDown(startTime){
    let endTime = startTime + 10000   //20 minutes = 1200000
    let timer = setInterval(() => {
        let timeLeft = endTime - Date.now()
        if (timeLeft <= 0){
            clearInterval(timer)
            timeDisplay.textContent = "00:00"
            state = 2
            shift()
        } else {
            let minutes = Math.floor(timeLeft / 60000)
            let seconds = Math.floor((timeLeft % 60000) / 1000)
            minutes = String(minutes).padStart(2, 0)
            seconds = String(seconds).padStart(2, 0)
            timeDisplay.textContent = `${minutes}:${seconds}`
        }
    }, 10)
}