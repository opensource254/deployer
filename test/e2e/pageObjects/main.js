module.exports = {
  commands: [],
  url: `http://localhost:${process.env.PORT}`,
  elements: {
    docButton: {
      selector: '.button--green',
    },
    githubButton: {
      selector: '.button--grey',
    },
  },
}
