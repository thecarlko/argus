



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


export function generateRocketAltitude(seconds: number): number[] {
    const altitude: number[] = [];
    const maxAcceleration = 9.8 * 5; // Max acceleration (m/s^2), scaled up to 5G
    const gravity = 9.8; // Gravity (m/s^2)
    let velocity = 0; // Initial velocity (m/s)
    let currentAltitude = 0; // Initial altitude (m)

    for (let t = 0; t <= seconds; t++) {
        if (t < 10) {
            // Rapid ascent with high acceleration (up to maxAcceleration)
            velocity += maxAcceleration - gravity;
        } else if (t < 50) {
            // Slower ascent as the rocket burns fuel
            velocity += maxAcceleration / 2 - gravity;
        } else {
            // Approaching peak altitude with decreasing velocity
            velocity -= gravity / 2; // Gradual slowdown
            if (velocity < 0) velocity = 0; // No negative velocity
        }

        currentAltitude += velocity; // Update altitude
        altitude.push(Math.max(0, currentAltitude / 1000)); // Convert to km and ensure no negative altitude
    }

    return altitude;
}


export function calculatePressure(altitude: number): number {
    // Constants
    const P0 = 101325; // Sea level pressure in Pascals
    const T0 = 288.15; // Sea level standard temperature in Kelvin
    const L = 0.0065; // Temperature lapse rate in K/m
    const R = 8.3144598; // Universal gas constant in J/(mol*K)
    const M = 0.0289644; // Molar mass of Earth's air in kg/mol
    const g = 9.80665; // Gravitational acceleration in m/s^2

    const altitudeMeters = altitude * 1000; // Convert altitude to meters

    if (altitudeMeters <= 11000) {
        // Troposphere (0–11 km)
        const T = T0 - L * altitudeMeters; // Temperature at altitude
        const pressure = P0 * Math.pow(T / T0, (g * M) / (R * L));
        return pressure;
    } else if (altitudeMeters <= 20000) {
        // Lower Stratosphere (11–20 km)
        const T = T0 - L * 11000; // Temperature is constant above 11 km
        const P11 = P0 * Math.pow(T / T0, (g * M) / (R * L)); // Pressure at 11 km
        const pressure = P11 * Math.exp((-g * M * (altitudeMeters - 11000)) / (R * T));
        return pressure;
    } else {
        // Beyond 20 km (simplified exponential decay)
        const T = T0 - L * 11000; // Approximation with constant temperature
        const P20 = P0 * Math.pow(T / T0, (g * M) / (R * L)) * Math.exp((-g * M * (20000 - 11000)) / (R * T)); // Pressure at 20 km
        const pressure = P20 * Math.exp(-0.0001 * (altitudeMeters - 20000)); // Exponential decay
        return pressure;
    }
}


export function calculateRocketTemperature(
    altitude: number,
    time: number,
    initialTemperature: number
): number {
    // Constants
    const T0 = 288.15; // Sea level temperature in Kelvin
    const L = 0.0065; // Temperature lapse rate in K/m
    const altitudeMeters = altitude * 1000; // Convert altitude to meters
    const lambda = 0.05; // Cooling rate constant (arbitrary, can be tuned)

    let ambientTemperature: number;

    // Calculate ambient temperature based on altitude
    if (altitudeMeters <= 11000) {
        // Troposphere
        ambientTemperature = T0 - L * altitudeMeters;
    } else {
        // Stratosphere (approximation)
        ambientTemperature = T0 - L * 11000; // Constant above 11 km
    }

    // Calculate rocket temperature based on cooling
    const rocketTemperature =
        ambientTemperature +
        (initialTemperature - ambientTemperature) * Math.exp(-lambda * time);

    return rocketTemperature;
}
