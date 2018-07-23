import {css} from "emotion";

/**
 * Convert an object with style keys to CSS rules into an object of emotion classes with the same keys
 */
export function stylesListToClassNames(styles) {
    return Object.keys(styles).reduce((classNames, styleKey) => {
        classNames[styleKey] = css(styles[styleKey]);
        return classNames;
    }, {});
}
