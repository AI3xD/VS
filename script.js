document.getElementById("startButton").addEventListener("click", function() {
    var count = 10;
    var counterElement = document.getElementById("counter");
    var countdownSound = document.getElementById("countdownSound");
    var finishSound = document.getElementById("finishSound");
    var imageElement = document.getElementById("image");

    counterElement.innerText = count;

    var countdown = setInterval(function() {
        count--;
        counterElement.innerText = count;

        if (count === 0) {
            clearInterval(countdown);
            countdownSound.pause();
            countdownSound.currentTime = 0;
            imageElement.style.display = "inline";

            // Verifica el valor del contador externo
            var externalCounter = parseInt(document.getElementById("externalCounter").innerText);

            if (externalCounter <= 10) {
                imageElement.src = "foxy-jumpscare.gif";
                var sound = new Audio("sonido2.mp3");
                sound.play();
            } else {
                imageElement.src = "Buenooo.WEBP";
                var sound = new Audio("sonido3.mp3");
                sound.play();
            }
            // Crear y mostrar el botón "Volver a Votar"
            var reloadButton = document.getElementById("reloadButton");
            reloadButton.style.display = "inline";

            reloadButton.addEventListener("click", function() {
                location.reload();
            });

            var reloadButton2 = document.getElementById("reloadButton2");
            reloadButton2.style.display = "inline";

            reloadButton2.addEventListener("click", function() {
                location.reload();
            });
        } else {
            countdownSound.play();
        }
    }, 1000);
    
});
