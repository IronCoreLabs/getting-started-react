import {stylesListToClassNames} from "./Utils";

let previous;

const classes = stylesListToClassNames({
    snackbar: {
        alignItems: "center",
        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.3)",
        color: "#fff",
        display: "inline-flex",
        fontSize: "16px",
        justifyContent: "center",
        left: "50%",
        lineHeight: "22px",
        marginTop: "20px",
        minHeight: "14px",
        minWidth: "300px",
        opacity: "0",
        padding: "18px 24px",
        position: "absolute",
        transform: "translate(-50%, 0)",
        transitionDuration: "0.4s",
        transitionProperty: "opacity, top",
        width: "100%",
    },
    snackbarSuccess: {backgroundColor: "#00c853"},
    snackbarError: {backgroundColor: "#d51819"},
    snackbarInfo: {backgroundColor: "#00bcd4"},
    snackbarWarning: {backgroundColor: "#fcd92d"},
    snackbarAction: {background: "inherit", display: "inline-block", border: "none", marginLeft: "24px", padding: "0"},
});

/**
 * Clear the snackbar either by removing it completely, or by transitioning it out by setting the
 * opacity/top rules correctly.
 */
function dismissSnackbar(element, force) {
    if (element) {
        if (force) {
            document.body.removeChild(element);
        } else {
            element.style.opacity = "0";
            element.style.top = "0";
        }
    }
}

function dismissAfterTimeout(item) {
    if (item) {
        dismissSnackbar(item, false);
    }
}

/**
 * Displays a "snackbar" UI to show the user a success/info/fail message. Message will appear
 * in top center of screen and disappear after a set amount of time
 * @param message Label to display in snackbar
 * @param type    Type of message to display. Either success/info/error/warning
 * @param timeout Length in ms that snackbar will appear
 */
const snackbar = (message, type = "success") => {
    const timeout = type === "error" ? 4000 : 2000;
    dismissSnackbar(previous, true);
    const snackbar = document.createElement("div");
    snackbar.className = `${classes.snackbar} ${classes[`snackbar${type.charAt(0).toUpperCase() + type.slice(1)}`]}`;
    snackbar.setAttribute("role", "alert");
    //Adjust top position to account for the users scroll height
    snackbar.style.top = `${window.scrollY}px`;

    snackbar.appendChild(document.createTextNode(message));

    setTimeout(dismissAfterTimeout.bind(null, snackbar), timeout);
    snackbar.addEventListener("transitionend", () => {
        //Check if both transitions are complete before removing the element
        if (previous && previous.style.opacity === "0" && previous.style.top === "0px") {
            dismissSnackbar(previous, true);
            previous = null;
        }
    });

    previous = snackbar;
    document.body.appendChild(snackbar);
    /* eslint-disable */
    getComputedStyle(snackbar).top;
    /* eslint-disable */
    snackbar.style.top = `${document.getElementById("dcp-gs-chunk").offsetTop - 19}px`;
    snackbar.style.opacity = "1";
};

export default snackbar;
