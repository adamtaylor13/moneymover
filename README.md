# MoneyMover: A Chrome Extension designed to give Lunch Money superpowers

MoneyMover is a Chrome extension that enhances the functionality of Lunch Money, a personal finance and budgeting tool. 
The goal of MoneyMover is to make small QoL enhancements to the site.

## Table of Contents
- [Setup](#setup)
- [Build](#build)
- [Build in Watch Mode](#build-in-watch-mode)
- [Load Extension to Chrome](#load-extension-to-chrome)
- [Test](#test)
- [Contribution](#contribution)
- [Reporting Bugs](#reporting-bugs)
- [FAQs](#faqs)
- [Technologies Used](#technologies-used)

## Setup

To set up the project locally, run the following command:

```
yarn install
```

## Build

To build the project, use the following command:

```
yarn build
```

## Build in Watch Mode

To build the project in watch mode, use the following command:

```
yarn watch
```

## Load Extension to Chrome

To load the extension to Chrome, open `chrome://extensions` and click "Load Unpacked", and then select the `dist` directory. Now refresh the page and you should have the functionality enabled. If in doubt, open the console and look for the `MoneyMover: Initialized` log.

## Test

To run tests, use the following command:

```
npx jest
```
or
```
npm run test
```

## Contribution

We welcome contributions from the community. Please read our [contribution guide](CONTRIBUTING.md) for more information.

## Reporting Bugs

If you encounter any bugs or issues, please report them in the [issue tracker](https://github.com/yourusername/yourrepository/issues).

## FAQs

For any questions, please check our [FAQs](FAQ.md) or open an issue.

## Technologies Used

- JavaScript
- TypeScript
- React
- Jest
- Webpack

