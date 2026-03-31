// Countdown Timer with Event Started & Finished States
document.addEventListener('DOMContentLoaded', function() {
    initializeCountdown();
});

function initializeCountdown() {
    // 🎯 Set event start date & time
    const eventStartDate = new Date('2025-10-02T21:55:00').getTime();
    const eventEndDate = eventStartDate + (24 * 60 * 60 * 1000); // +1 day

    function updateCountdown() {
        const now = new Date().getTime();

        // Case 1: Before event start → countdown
        if (now < eventStartDate) {
            const difference = eventStartDate - now;

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            // Update DOM elements
            const daysElement = document.getElementById('days');
            const hoursElement = document.getElementById('hours');
            const minutesElement = document.getElementById('minutes');
            const secondsElement = document.getElementById('seconds');

            if (daysElement) daysElement.textContent = days.toString().padStart(3, '0');
            if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
            if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
            if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
        } 
        // Case 2: Event started but not yet finished
        else if (now >= eventStartDate && now < eventEndDate) {
            clearInterval(countdownInterval); // stop timer updates
            const countdownTimer = document.getElementById('countdown-timer');
            if (countdownTimer) {
                countdownTimer.innerHTML = '<div class="text-green-500 text-2xl font-bold text-center mt-4">Event Started!</div>';
            }
        } 
        // Case 3: Event finished
        else {
            clearInterval(countdownInterval); // stop timer updates
            const countdownTimer = document.getElementById('countdown-timer');
            if (countdownTimer) {
                countdownTimer.innerHTML = '<div class="text-red-500 text-2xl font-bold text-center mt-4">Event Finished!</div>';
            }
        }
    }

    // Update immediately
    updateCountdown();

    // Update every second
    const countdownInterval = setInterval(updateCountdown, 1000);
}

// Export function for use in other files
window.CountdownTimer = {
    initializeCountdown
};
