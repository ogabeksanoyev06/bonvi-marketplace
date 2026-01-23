import type { DirectiveBinding } from 'vue'

export const VLazyLoad = {
	mounted(el: HTMLElement, binding: DirectiveBinding<string>) {
		// Faqat clientda ishlasin (SSR paytida DOM yo‘q)
		if (typeof window === 'undefined') return

		// Parametrlar (threshold - 0.25: rasm ekranga 25% kirsa yuklanadi)
		const options: IntersectionObserverInit = {
			rootMargin: '0px',
			threshold: 0.25
		}

		// Boshlang‘ich holat: yuklanmoqda
		el.classList.add('image-loading')

		const callback: IntersectionObserverCallback = (entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const image = el.querySelector('img') as HTMLImageElement | null
					if (!image) return

					const temp = new Image()

					temp.onload = () => {
						image.src = binding.value
						el.classList.remove('image-loading', 'error')
						el.classList.add('loaded')
						observer.unobserve(el)
					}

					temp.onerror = () => {
						image.src = el.getAttribute('error-state') || '/images/default.svg'
						el.classList.remove('image-loading')
						el.classList.add('error')
						observer.unobserve(el)
					}

					// Rasmni yuklashni boshlaymiz
					temp.src = binding.value
				}
			})
		}

		// Observerni yaratish
		const observer = new IntersectionObserver(callback, options)
		observer.observe(el)
	}
}
