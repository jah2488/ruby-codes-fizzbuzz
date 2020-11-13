import Filter from "bad-words";

const wordWhitelist = [
  'hell'
];

export default class _Filter {
  constructor() {
    const filter = new Filter();
    filter.removeWords(...wordWhitelist);
    return filter;
  }
}
