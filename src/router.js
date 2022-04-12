import { createRouter, createWebHistory } from 'vue-router'

import TutorsList from '~/pages/tutors/tutors-list.vue'
import TutorDetails from '~/pages/tutors/tutor-details.vue'
import TutorRegistration from '~/pages/tutors/tutor-registration.vue'
import ContactTutor from '~/pages/requests/contact-tutor.vue'
import RequestsList from '~/pages/requests/requests-list.vue'
import NotFound from '~/pages/not-found.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/tutors'},
    { path: '/tutors', component: TutorsList },
    { path: '/tutors/:id',
      component: TutorDetails,
      props: true,
      children: [
        { path: 'contact', component: ContactTutor }
      ] },
    { path: '/register', component: TutorRegistration },
    { path: '/requests', component: RequestsList },
    { path: '/:not-found(.*)', component: NotFound },
  ]
})

export default router
