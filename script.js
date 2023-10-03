//setup the canvas
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

/**make the canvas always fill the screen**/;
(function resize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    window.onresize = resize
})()

//for this code (as in code before this line), I almost always use the same stuff, so its going to stay here

//define the pixel size
const targetPixelSize = 5
const gx = Math.round(canvas.width / targetPixelSize)
const gy = Math.round(canvas.height / targetPixelSize)
const px = canvas.width / gx
const py = canvas.height / gy

//create the sandbox
let sandbox = []
for (let y = 0; y < gy; y++) {
    sandbox[y] = []
    for (let x = 0; x < gx; x++) {
        sandbox[y][x] = ['void', 'stone', 'sand'][Math.floor(Math.random() * 3)]
    }
}

//define the sands
const sandTypes = {
    'void': {
        color: 'rgb(0,0,0)',
    },
    'stone': {
        color: 'rgb(100,100,100)'
    },
    'sand': {
        color: 'rgb(100,100,0)',
        func(self, x, y) {
            if (y < gy - 1 && sandbox[y + 1][x] == 'void') {
                sandbox[y][x] = 'void'
                sandbox[y + 1][x] = 'sand'
                console.log("I fell")
            }
        }
    }
}

//now for the logic loop
setInterval(() => {
    for (let y = 0; y < gy; y++) {
        for (let x = 0; x < gx; x++) {
            let pixelType = sandTypes[sandbox[y][x]]
            if (pixelType.func)
                pixelType.func(sandbox[y][x], x, y)
        }
    }
    render()
}, 1000 / 10)

//the render function
function render() {
    //clear the screen
    ctx.fillStyle = 'rgb(0,0,0)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    //render the sandbox
    for (let y = 0; y < gy; y++) {
        for (let x = 0; x < gx; x++) {
            ctx.fillStyle = sandTypes[sandbox[y][x]].color
            ctx.fillRect(x * px, y * py, px, py)
        }
    }
}

render()