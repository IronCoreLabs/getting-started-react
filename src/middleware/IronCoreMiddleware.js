import * as IronWeb from "@ironcorelabs/ironweb";
import showSnackbar from "../lib/Snackbar";

/**
 * Take the add order action and encrypt the order text before passing along the data to the next middleware.
 */
function encryptNewOrder(next, action, awayTeamID) {
    return IronWeb.document
        .encrypt(IronWeb.codec.utf8.toBytes(action.payload.body), {accessList: {groups: [{id: awayTeamID}]}})
        .then((encryptedDoc) => {
            next({
                ...action,
                payload: {...action.payload, body: encryptedDoc.document, id: encryptedDoc.documentID, encrypted: true},
            });
        })
        .catch((e) => {
            showSnackbar(`Error encrypting document: ${e.message}`, "error");
            if (action.onFail) {
                action.onFail();
            }
        });
}

/**
 * Decrypt the content of the provided order get action before passing along the decrypted content to the next middleware.
 */
function decryptOrder(next, action) {
    IronWeb.document
        .decrypt(action.payload.id, action.payload.body)
        .then((decryptedDoc) => {
            next({
                ...action,
                payload: {...action.payload, body: IronWeb.codec.utf8.fromBytes(decryptedDoc.data)},
            });
        })
        .catch((e) => {
            if (e.code === IronWeb.ErrorCodes.DOCUMENT_GET_REQUEST_FAILURE) {
                showSnackbar("Order cannot be decrypted by this user!", "error");
            } else {
                showSnackbar(`Error decrypting document: ${e.message}`, "error");
            }
            if (action.onFail) {
                action.onFail();
            }
        });
}

/**
 * Pre middleware which runs before all other middlewares. This allows us to insert our encryption routine before the API
 * middleware runs to save the data to the database (local storage in our sample).
 */
export const encryptionMiddleware = (store) => (next) => (action) => {
    if (action.type === "ADD_ORDER") {
        return encryptNewOrder(next, action, store.getState().awayTeam.id);
    }
    next(action);
};

/**
 * Post middleware which runs after all other middlewares. This allows us to insert our decryption routine after the API
 * middleware runs to retrieve the order data from the database (local storage in our sample).
 */
export const decryptionMiddleware = (state) => (next) => (action) => {
    if (action.type === "GET_ORDER") {
        //When we get an action for a new order we need to conditionally decrypt it if the data is encrypted. If this
        //order was created prior to encryption, we just want to pass it along. Otherwise we want to decrypt it and pass
        //along an action with the decrypted data.
        if (action.payload.encrypted) {
            //Data is encrypted, decrypt, and then modify the action content with the decrypted content before dispatching
            return decryptOrder(next, action);
        }
        return next(action);
    }
    next(action);
};
