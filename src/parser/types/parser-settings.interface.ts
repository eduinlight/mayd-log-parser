export interface ParserLineValueFormat {
  type: Date | string | Record<string, any>;
  // if key exist then is created an object {key: value}
  key?: string;
  // match exist the value is going to be matched with the string representation of the value
  // Note: the entire line is not going to be included if not match
  match?: RegExp;
  // this is for JSON type only and if used only the specified keys are going to be selected
  keepKeys?: string[];
}

export interface ParserSettings {
  path: string;
  lineFormat: ParserLineValueFormat[];

}
