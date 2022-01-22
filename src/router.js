import { createRouter, createWebHistory } from 'vue-router'

import tutorsList from '@/pages/tutors/tutors-list'
import tutorDetails from '@/pages/tutors/tutor-details'
import tutorRegistration from '@/pages/tutors/tutor-registration'
import contactTutor from '@/pages/requests/contact-tutor'
import requestsList from '@/pages/requests/requests-list'
import notFound from '@/pages/not-found'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/tutors'},
    { path: '/tutors', component: tutorsList },
    { path: '/tutors:id', component: tutorDetails, children: [
        { path: '/contact', component: contactTutor }
      ] },
    { path: '/register', component: tutorRegistration },
    { path: '/requests', component: requestsList },
    { path: '/:not-found(.*)', component: notFound },
  ]
})

export default router