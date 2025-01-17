



/**
 * Generates a random 1D array representing velocity over time for a model rocket.
 * @param {number} duration - The duration of the flight in seconds (array length).
 * @param {number} maxVelocity - The maximum velocity the rocket can achieve (e.g., m/s).
 * @returns {number[]} A 1D array of velocities over time.
 */
export function sampleVelocityData(duration: number, maxVelocity: number) : number[] {
    const velocityArray = [];
    let currentVelocity = 0;

    for (let i = 0; i < duration; i++) {
        if (i < duration / 3) {
            currentVelocity += Math.random() * (maxVelocity / (duration / 3));
        } else if (i < (2 * duration) / 3) {
            currentVelocity -= Math.random() * (maxVelocity / (duration * 10));
        } else {
            currentVelocity -= Math.random() * (maxVelocity / (duration / 3));
        }
        // Ensure velocity doesn't drop below 0
        currentVelocity = Math.max(0, currentVelocity);

        velocityArray.push(currentVelocity);
    }

    return velocityArray;
}


