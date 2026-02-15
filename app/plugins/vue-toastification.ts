import Toast from 'vue-toastification'

import 'vue-toastification/dist/index.css'

import CommonToast from '@/components/Common/Toast.vue'

const options = {
	component: CommonToast,
	closeButton: false,
	icon: false,
	hideProgressBar: true,
	position: 'top-center'
}

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(Toast, options)
})
