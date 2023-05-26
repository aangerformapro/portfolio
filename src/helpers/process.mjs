
/**
 * Bootstrap popper js fix
 */
if (typeof window !== "undefined" && typeof process === "undefined") {

    window.process = {
        env: {
            NODE_ENV: 'production'
        }
    }

}