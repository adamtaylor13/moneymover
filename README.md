# MoneyMover: A Chrome Extension designed to give Lunch Money superpowers

<img height="500" width="500" src="public/icon.png" />

Why yes, this is a cheap DALL-E generated icon. 😬

---

## What does it do?

MoneyMover is a Chrome extension that enhances the functionality of Lunch Money, a personal finance and budgeting tool.
The goal of MoneyMover is to make small QoL enhancements to the site.

Currently it only adds a few key-bindings:

- "n": Go to the "Next" month
- "p": Go to the "Previous" month
- "r": Click "Review Transactions" button
- "t": Go to "this" month
- "/": Focus and select the "Quick Filter" input
- "Escape": Overloaded
  - Clears applied filters (if any). It determines this on the presence of the "X Clear Filter" icon in any table.
  - Closes a modal (if open). It determines this based on a modal being open with a "close" or "cancel" button.
- "Tab": Jumps between subnav menus (Hint: Use "+ Shift" to go backwards)

At this point, all the keybindings are loosely based on Google Calendar's navigation keys.
These keys should only trigger if the user is not focused on an input element.

Future ideas:

- Close modals with "Esc"
- Save modals with "S"
- More vim-like navigation
- User options to enable/disable/remap as they like.
- Chrome Extension Store? (maybe)

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
