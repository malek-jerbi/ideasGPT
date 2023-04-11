const mockOpenai = {
  Configuration: class {},
  OpenAIApi: class {
    constructor() {
      this.createCompletion = jest.fn()
    }
  },
}

export default mockOpenai
