import CustomToast from '~/components/Common/Toast.vue'
import { useToast } from 'vue-toastification'

type ToastType = 'success' | 'error' | 'info' | 'warning'

export const useCustomToast = () => {
	const toast = useToast()

	const showToast = (text: string, type: ToastType = 'success') => {
		if (['success', 'error', 'info', 'warning'].includes(type)) {
			toast[type]?.({
				component: CustomToast,
				props: { text, type }
			})
		} else {
			toast({
				component: CustomToast,
				props: { text, type: 'info' }
			})
		}
	}

	return { showToast }
}
