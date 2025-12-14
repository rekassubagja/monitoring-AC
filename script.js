/**
 * @fileoverview AC Monitoring Dashboard Logic - Implemented using an OOP approach (ACMonitorApp class).
 * This script handles the connection state and dynamically updates the UI (colors, icons, sensor values).
 */

class ACMonitorApp {
    /**
     * Initializes the application. Selects all necessary DOM elements and sets up event listeners.
     */
    constructor() {
        // --- State ---
        /** @type {boolean} Current connection status. Toggles on indicator click. */
        this.isConnected = false;

        // --- DOM Elements Caching ---
        this.indicatorBtn = document.getElementById('indicatorBtn');
        this.indicatorIcon = document.getElementById('indicatorIcon');
        this.indicatorText = document.getElementById('indicatorText');
        this.pulseRing = document.getElementById('pulseRing');
        
        /** @type {NodeListOf<HTMLElement>} All elements displaying sensor values. */
        this.sensorValues = document.querySelectorAll('.sensor-val');

        // Initialize event listeners and the UI
        this.setupEventListeners();
        this.initialize();
    }

    /**
     * Sets up the main click event listener for the connection indicator button.
     * @private
     */
    setupEventListeners() {
        if (this.indicatorBtn) {
            this.indicatorBtn.addEventListener('click', this.handleIndicatorClick.bind(this));
        }
    }

    /**
     * Initializes the UI on page load. Ensures the DOM is ready before updating.
     * @private
     */
    initialize() {
        // Ensure UI is updated as soon as the DOM is ready (or immediately if already loaded)
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.updateUI());
        } else {
            this.updateUI();
        }
    }

    // --- Logic Functions ---

    /**
     * Updates the user interface (UI) based on the current connection state (this.isConnected).
     * This function manages button styles, icons, text, and sensor data display.
     */
    updateUI() {
        if (this.isConnected) {
            // === Connected State (Online - Green Theme) ===
            
            // 1. Button Styling (Emerald/Green Gradient, Shadow, No Pulse)
            this.indicatorBtn.className = "group relative flex items-center gap-1 sm:gap-1.5 rounded-full px-2.5 sm:px-3 py-1 transition-all duration-300 ease-out hover:scale-105 active:scale-95 shadow-lg bg-gradient-to-r from-emerald-500 to-emerald-400 shadow-emerald-900/40 ring-1 ring-white/10";
            
            // 2. Icon and Text
            this.indicatorIcon.innerText = "wifi";
            this.indicatorText.innerText = "Online";
            
            // 3. Hide Pulsing Ring
            this.pulseRing.className = "hidden";

            // 4. Update Sensor Values (Read from the 'data-val' attribute)
            this.sensorValues.forEach(el => {
                // Retrieves the true sensor reading stored in HTML
                el.innerText = el.getAttribute('data-val');
            });

        } else {
            // === Disconnected State (Offline - Red Theme) ===

            // 1. Button Styling (Rose/Red Gradient, Shadow, Pulsing)
            this.indicatorBtn.className = "group relative flex items-center gap-1 sm:gap-1.5 rounded-full px-2.5 sm:px-3 py-1 transition-all duration-300 ease-out hover:scale-105 active:scale-95 shadow-lg bg-gradient-to-r from-rose-600 to-red-500 shadow-rose-900/40 ring-1 ring-white/10";

            // 2. Icon and Text
            this.indicatorIcon.innerText = "wifi_off";
            this.indicatorText.innerText = "Offline";

            // 3. Show Pulsing Ring (The visual indicator of being offline/seeking connection)
            this.pulseRing.className = "absolute -inset-1 -z-10 rounded-full bg-red-500 opacity-20 animate-ping";

            // 4. Reset Sensor Values to 0
            this.sensorValues.forEach(el => {
                el.innerText = "0";
            });
        }
    }

    /**
     * Event handler for when the connection indicator button is clicked.
     * Toggles the connection state and updates the UI.
     * @public
     */
    handleIndicatorClick() {
        // Toggle the internal state
        this.isConnected = !this.isConnected;
        
        // Reflect the new state in the UI
        this.updateUI();
    }
}

// --- Application Entry Point ---
// Instantiate the main application class to start the dashboard logic.
new ACMonitorApp();