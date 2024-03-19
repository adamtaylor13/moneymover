import React from "react";
import ReactDOM from "react-dom";
import { Message } from "@messages/types";
import "./base.css";

function tellContentScript(message: Message) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currTab = tabs[0];
    if (currTab && currTab.id) {
      chrome.tabs.sendMessage(currTab.id, message);
    }
  });
}

function highlightElement(key: string) {
  tellContentScript({
    topic: "HIGHLIGHT_ELEMENT",
    payload: {
      key,
    },
  });
}

function unhighlightElement(key: string) {
  tellContentScript({
    topic: "UNHIGHLIGHT_ELEMENT",
    payload: {
      key,
    },
  });
}

function clickElement(key: string) {
  tellContentScript({
    topic: "CLICK_ELEMENT",
    payload: {
      key,
    },
  });
}

const keybindings = [
  {
    key: ">",
    description: "Go to the 'Next' month",
  },
  {
    key: "<",
    description: "Go to the 'Previous' month",
  },
  {
    key: ".",
    description: "Go to 'this' month",
  },
  {
    key: "j",
    description: "Move down a row in a table",
  },
  {
    key: "k",
    description: "Move up a row in a table",
  },
  {
    key: "/",
    description: "Focus and select the 'Quick Filter' input",
  },
  {
    key: "Escape",
    description:
      "This key is 'Overloaded' meaning it works differently depending on the UI state",
    overloads: [
      {
        description:
          "Clears applied filters (if any). It determines this on the presence of the 'X Clear Filter' icon in any table.",
      },
      {
        description:
          "Closes a modal (if open). It determines this based on a modal being open with a 'close' or 'cancel' button.",
      },
    ],
  },
  {
    key: "Tab",
    description:
      "Jumps between subnav menus (Hint: Use '+ Shift' to go backwards)",
  },
];

const transactionKeybindings = [
  {
    key: "x",
    description: "Select transaction for bulk edit",
  },
  {
    key: "c",
    description: "Change 'Category'",
  },
  {
    key: "p",
    description: "Change 'Payee'",
  },
  {
    key: "a",
    description: "Change 'Amount'",
  },
  {
    key: "n",
    description: "Change 'Notes'",
  },
  {
    key: "t",
    description: "Add Tag",
  },
  {
    key: "r",
    description: "Mark/Unmark current transaction reviewed",
  },
  {
    key: "m",
    description: "Mark selected transactions reviewed",
  },
  {
    key: "Enter",
    description: "Open details pane for selected transaction",
  },
  {
    key: "/",
    description: "Quick Filter",
  },
]

const recurringKeybindings = [
  {
    key: "Enter",
    description: "Open details pane for current row",
  },
  {
    key: "n",
    description:
      "This key is 'Overloaded' meaning it works differently depending on the UI state",
    overloads: [
      {
        description: "'No' button if Create rule dialog box is open.",
      },
      {
        description: "'This is not a recurring item' if details pane is open."
      },
    ],    
  },
  {
    key: "y",
    description: "'Yes' button if Create rule dialog box is open.",
  },
  {
    key: "a",
    description: "'Approve this new recurring item' if details pane is open",
  },
]

const Popup = () => {
  return (
    <div className={"w-[575px] rounded-md shadow-md p-8 text-md"}>
      <p className={"text-sm italic"}>
        MoneyMover: A Chrome Extension designed to give Lunch Money superpowers
      </p>

      <div className={"my-8"}>
        <p className={"font-bold"}>What does it do?</p>
        <p>
          MoneyMover is a Chrome extension that enhances the functionality of
          Lunch Money, a personal finance and budgeting tool. It's goal is to
          make small QoL enhancements to the site.
        </p>
      </div>

      <div className="my-8">
        <p className={"font-semibold text-2xl mb-4"}>Global Key Bindings:</p>
        <ul className={"ml-4 list-disc"}>
          {keybindings.map((binding, i) => (
            <li
              className={"hover:cursor-help"}
              key={i}
              onMouseEnter={() => {
                highlightElement(binding.key);
              }}
              onMouseLeave={() => {
                unhighlightElement(binding.key);
              }}
              onClick={() => {
                clickElement(binding.key);
              }}
            >
              <div className={"mb-2"}>
                <span
                  className={
                    "font-semibold p-1 bg-gray-100 rounded-md border border-stone-200 min-w-[20px] inline-flex justify-center"
                  }
                >
                  {binding.key}
                </span>
                <span className={"ml-3"}>{binding.description}</span>
              </div>
              {binding.overloads && (
                <ul className={"ml-4 list-disc"}>
                  {binding.overloads.map((overload, i) => (
                    <li key={i}>{overload.description}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="my-8">
        <p className={"font-semibold text-2xl mb-4"}>Transactions Page:</p>
        <ul className={"ml-4 list-disc"}>
          {transactionKeybindings.map((binding, i) => (
            <li
              className={"hover:cursor-help"}
              key={i}
              onMouseEnter={() => {
                highlightElement(binding.key);
              }}
              onMouseLeave={() => {
                unhighlightElement(binding.key);
              }}
              onClick={() => {
                clickElement(binding.key);
              }}
            >
              <div className={"mb-2"}>
                <span
                  className={
                    "font-semibold p-1 bg-gray-100 rounded-md border border-stone-200 min-w-[20px] inline-flex justify-center"
                  }
                >
                  {binding.key}
                </span>
                <span className={"ml-3"}>{binding.description}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="my-8">
        <p className={"font-semibold text-2xl mb-4"}>Recurring Page:</p>
        <ul className={"ml-4 list-disc"}>
          {recurringKeybindings.map((binding, i) => (
            <li
              className={"hover:cursor-help"}
              key={i}
              onMouseEnter={() => {
                highlightElement(binding.key);
              }}
              onMouseLeave={() => {
                unhighlightElement(binding.key);
              }}
              onClick={() => {
                clickElement(binding.key);
              }}
            >
              <div className={"mb-2"}>
                <span
                  className={
                    "font-semibold p-1 bg-gray-100 rounded-md border border-stone-200 min-w-[20px] inline-flex justify-center"
                  }
                >
                  {binding.key}
                </span>
                <span className={"ml-3"}>{binding.description}</span>
              </div>
              {binding.overloads && (
                <ul className={"ml-4 list-disc"}>
                  {binding.overloads.map((overload, i) => (
                    <li key={i}>{overload.description}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>


      <p className={"mt-4"}>
        At this point, all the keybindings are loosely based on Google
        Calendar's navigation keys. These keys should only trigger if the user
        is not focused on an input element.
      </p>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
