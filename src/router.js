import { createRouter, createWebHistory } from 'vue-router'

import TutorsList from '~/pages/tutors/tutors-list.vue'
import TutorDetails from '~/pages/tutors/tutor-details.vue'
import TutorRegistration from '~/pages/tutors/tutor-registration.vue'
import ContactTutor from '~/pages/requests/contact-tutor.vue'
import RequestsList from '~/pages/requests/requests-list.vue'
import UserAuth from '~/pages/user-auth.vue'
import NotFound from '~/pages/not-found.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/tutors' },
    { path: '/user-auth', component: UserAuth },
    { path: '/tutors', component: TutorsList },
    { path: '/tutors/:id', component: TutorDetails, props: true },
    { path: '/tutors/:id/contact', component: ContactTutor, props: true },
    { path: '/register', component: TutorRegistration },
    { path: '/requests', component: RequestsList },
    { path: '/:notFound(.*)', component: NotFound }
  ]
})

export default router
