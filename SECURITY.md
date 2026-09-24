# Security Policy

## This is a tutorial repo, not a production service

`getting-started-react` is the sample application for [IronCore's React getting-started tutorial](https://ironcorelabs.com/docs/getting-started/react). It runs entirely on the reader's own machine (`yarn run secure` / `yarn run insecure`) and is not deployed anywhere IronCore operates. Nothing in this repo processes real user data.

## Known, intentional findings (not vulnerabilities)

The following are deliberate choices to make the tutorial copy-pasteable. They have been triaged; please do not open a new report for them.

- **`private.key` is committed in plaintext.** It is an ES256 signing key for a single sandbox IronCore project (`ironcore-config.json`: `projectId: 2`, `segmentId: "getting-started-react"`) that exists only to back this tutorial. It cannot sign for, decrypt, or otherwise affect any other IronCore customer or project. It is rotated if there is evidence of misuse, not because it is public in this repository, which is intentional; README.md tells readers to swap in their own key for anything beyond the tutorial.
- **`ironcore-config.json` ships real-looking IDs.** `projectId`, `segmentId`, and `serviceKeyId` are identifiers, not secrets, and are meaningless without the matching private key.
- **`src/server.js` mints a JWT for any `userID` passed on the query string.** This is called out in a comment directly above the code: the demo server has no concept of an authenticated caller, so it lets you request a token "as" any of the seeded Star Trek characters in `src/Constants.js` to make the tutorial's multi-user sharing flow easy to demonstrate. A real backend must derive the subject from its own session/auth layer, never from client input, and the tutorial explicitly says so.

None of the above grants access to another tenant's data, to IronCore's production systems, or to anything outside this sandbox project.

## Reporting a vulnerability

If you find a security issue that is **not** one of the items above, i.e. it affects IronCore's production services, SDKs, or cryptography rather than this tutorial's intentionally simplified demo server, please use IronCore's normal disclosure channel instead of filing an issue here:

- Submit through the [Bug Bounty program](https://ironcorelabs.com/trust-center/bug-bounty-program/).
- Past disclosures are published on the [Security Advisories](https://ironcorelabs.com/trust-center/security-advisories/) page.

Reports about the checked-in demo key, the demo config values, or the unauthenticated `/generateJWT` endpoint in this repo will be closed as expected behavior and will not receive a bounty.
