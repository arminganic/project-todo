export default function createTodo({
  author,
  text,
  createdOn = Date.now(),
  modifiedOn = Date.now(),
}) {
  if (!author) {
    throw new Error("Todo must have an author.");
  }
  if (author.length < 2) {
    throw new Error("Todo author's name must be longer than 2 characters.");
  }
  if (!text || text.length < 1) {
    throw new Error("Todo must include at least one character of text.");
  }

  return Object.freeze({
    getAuthor: () => author,
    getText: () => text,
    getCreatedOn: () => createdOn,
    getModifiedOn: () => modifiedOn,
  });
}
