// ======================================================
// TripCraft v2 Configuration
// ======================================================

window.TC_CONFIG = {

    // --------------------------------------------------
    // Google OAuth 2.0 Web Client ID
    // --------------------------------------------------
    googleClientId:
        localStorage.getItem("tc_google_client_id") || "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com",

    // --------------------------------------------------
    // Google API Token
    // Leave empty unless you have a separate API key.
    // Do NOT put the OAuth Client Secret here.
    // --------------------------------------------------
    googleApiToken: "",

    // --------------------------------------------------
    // Google Translate API Key
    // --------------------------------------------------
    googleTranslateApiKey:
        localStorage.getItem("tc_google_api_token") || "",

    // --------------------------------------------------
    // Backend API
    // Empty means same-origin API
    // --------------------------------------------------
    apiBase: ""

};


// ======================================================
// TripCraft Theme Engine
// ======================================================

(function () {

    try {

        // --------------------------------------------------
        // Dark mode
        // --------------------------------------------------

        var darkMode =
            localStorage.getItem("tc_dark");

        if (darkMode === "true") {

            document.documentElement.classList.add("dark");

        } else if (darkMode === "false") {

            document.documentElement.classList.remove("dark");

        }


        // --------------------------------------------------
        // Color palette
        // --------------------------------------------------

        var palette =
            localStorage.getItem("tc_palette") || "cobalt";


        var PAL_MAP = {

            cobalt: {
                teal: "#2447E0",
                gold: "#F6A91B"
            },

            teal: {
                teal: "#0E7C6B",
                gold: "#E8A838"
            },

            green: {
                teal: "#16803C",
                gold: "#CA8A04"
            },

            orange: {
                teal: "#D9480F",
                gold: "#EAB308"
            },

            rose: {
                teal: "#D6204A",
                gold: "#F59E0B"
            },

            purple: {
                teal: "#6D3FE0",
                gold: "#F59E0B"
            }

        };


        var activeColors =
            PAL_MAP[palette] || PAL_MAP.cobalt;


        document.documentElement.style.setProperty(
            "--teal",
            activeColors.teal
        );

        document.documentElement.style.setProperty(
            "--gold",
            activeColors.gold
        );


    } catch (error) {

        console.warn(
            "TripCraft theme initialization failed:",
            error
        );

    }

})();