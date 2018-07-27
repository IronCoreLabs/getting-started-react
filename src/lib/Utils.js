import {css} from "emotion";

const GROUP_ID_STORAGE_KEY = "ironcore-test-group";

/**
 * Convert an object with style keys to CSS rules into an object of emotion classes with the same keys
 */
export function stylesListToClassNames(styles) {
    return Object.keys(styles).reduce((classNames, styleKey) => {
        classNames[styleKey] = css(styles[styleKey]);
        return classNames;
    }, {});
}

/**
 * Get any existing group ID from local storage
 */
export function getTestGroup() {
    return localStorage.getItem(GROUP_ID_STORAGE_KEY);
}

/**
 * Set the provided group ID within local storage
 */
export function setTestGroup(groupID) {
    return localStorage.setItem(GROUP_ID_STORAGE_KEY, groupID);
}
