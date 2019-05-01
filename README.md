# IronCore Getting Started in React

IronCore is an SDK and cloud service that keeps application data private and secure. Get started with IronCore to grant, monitor, and revoke access to sensitive data in minutes. This sample React application shows how to add in the IronCore IronWeb JavaScript SDK to an existing application via Redux middleware.

## Tutorial

[Follow the tutorial to get started.](https://docs.ironcorelabs.com/getting-started/react)

## Setting Up The Application

First, we need to clone the repo for this app:

```
git clone https://github.com/IronCoreLabs/getting-started-react.git
cd getting-started-react
```

Then, install all dependencies

```
npm install
```

The application can then be started in two different modes:

```
npm run insecure
```

Will start the application without encrypting any of the orders you create. This gives you a sense of how the application works before adding in the IronWeb SDK. Once you get a sense for how this works you can then run

```
npm run secure
```

Which will layer in the Redux middleware for encrypting and decrypting orders. You can switch back and forth between these two different modes at anytime to see how the application behaves with and without the IronWeb SDK.

After running either of these NPM scripts your application should automatically open and be running locally at [http://localhost:3000](http://localhost:3000).

## A Note on API Keys

This application ships with a pre-generated set of API keys in order to simplify getting started. You can also generate your [own API keys](https://admin.ironcorelabs.com) to use as well. Just change the configuration within the `./ironcore-config.json` file and replace the existing `./private.key` file with yours.
