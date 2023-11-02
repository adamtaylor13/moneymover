type HighlightElementMessage = {
  topic: "HIGHLIGHT_ELEMENT";
  payload: {
    key: string;
  };
};

type UnhighlightElementMessage = {
  topic: "UNHIGHLIGHT_ELEMENT";
  payload: {
    key: string;
  };
};

type ClickElementMessage = {
  topic: "CLICK_ELEMENT";
  payload: {
    key: string;
  };
};

export type Message =
  | HighlightElementMessage
  | UnhighlightElementMessage
  | ClickElementMessage;
