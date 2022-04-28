export default {
  namespaced: true,
  state() {
    return {
      tutors: [
        {
          id: '0a655bc0-5146-4a8f-9fa2-ad3a701374ba',
          firstName: 'Maximilian',
          lastName: 'Schwarzmüller',
          areas: [1, 2, 3],
          description:
            "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
          hourlyRate: 30
        },
        {
          id: '50392f6a-6943-4066-8ff9-0a010938fd2a',
          firstName: 'Julie',
          lastName: 'Jones',
          areas: [1, 2],
          description:
            'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
          hourlyRate: 30
        }
      ]
    }
  },
  mutations: {},
  actions: {},
  getters: {
    tutors(state) {
      return state.tutors || []
    },
    haveTutors(state) {
      return state.tutors.length > 0
    }
  }
}