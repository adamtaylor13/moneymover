# MoneyMover: A Chrome Extension designed to give Lunch Money superpowers

<img height="500" width="500" src="public/icon.png" />

Why yes, this is a cheap DALL-E generated icon. 😬

---

## What does it do?

MoneyMover is a Chrome extension that enhances the functionality of Lunch Money, a personal finance and budgeting tool.
The goal of MoneyMover is to make small QoL enhancements to the site.

Currently it only adds a few key-bindings in different pages:

### URL Unrestricted keybindings:
- "j": Select next item in table
- "k": Select previous item in table
- "Escape": Overloaded
  - Clears applied filters (if any). It determines this on the presence of the "X Clear Filter" icon in any table.
  - Closes a modal (if open). It determines this based on a modal being open with a "close" or "cancel" button.
- "Tab": Jumps between subnav menus (Hint: Use "+ Shift" to go backwards)

Note: when using j/k navigation a bar appears to the left of the selected row. This will currently cause a blank column to appear to the right of all other columns in the table. This does not affect functionality, but is a visual bug. This will likely need changes from Jen to support a small column to the left in all tables that the blue indicator can occupy.

### Pages with Calendars:

- "<": Go to the "Next" month
- ">": Go to the "Previous" month
- ".": Go to "this" month

### /transactions/{date}
- "x": Select row
- "c": Focus category for current row
- "p": Focus payee for current row
- "a": Focus amount for current row (note that for imported transactions this will open the details pane)
- "n": Focus notes for current row
- "t": Add tag for current row
- "r": Mark/unmark current row reviewed
- "m": Mark selected rows reviewed
- "Enter": Open details pane for current row
- "/": Focus and select the "Quick Filter" input

Note: some of these shortcuts may be fragile, particularly for non-imported rows. This is because it relies on some attributes of the table, which may change.

### /recurring/suggested
- "Enter": Open details pane for current row
- "n": Conditional: "No" button if Create rule dialog box is open, else "This is not a recurring item" if details pane is open.
- "y": "Yes" button if Create rule dialog box is open
- "a": "Approve this new recurring item" if details pane is open

These keys should only trigger if the user is not focused on an input element.

Future ideas:

- Close modals with "Esc"
- Save modals with "S"
- More vim-like navigation
- User options to enable/disable/remap as they like.
- Chrome Extension Store? (maybe)

## A Note for Vimium users
Many MoneyMover keyboard shortcuts are inspired by [Vim](https://www.vim.org/) and keyboard navigation fanatics may also have the [Vimium - The Hacker's Browser](https://vimium.github.io/) installed as well.

MoneyMover overrides some of the default shortcuts for Vimium, so if you have both plugins installed please add ":https://my.lunchmoney.app/" to the list of Excluded URLs on the Vimium Plugin Options page.

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
