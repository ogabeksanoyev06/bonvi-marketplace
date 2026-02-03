import confetti from 'canvas-confetti'

export const useConfetti = () => {
	const confettiCanvas = ref<HTMLCanvasElement | null>(null)
	const targetElement = ref<HTMLElement | null>(null)
	let confettiInterval: any = null

	const startConfetti = () => {
		if (!confettiCanvas.value || !targetElement.value) return

		const canvas = confettiCanvas.value
		const element = targetElement.value

		canvas.width = window.innerWidth
		canvas.height = window.innerHeight

		const myConfetti = confetti.create(canvas, { resize: true })

		const rect = element.getBoundingClientRect()
		const x = (rect.left + rect.width / 2) / window.innerWidth
		const y = (rect.top + rect.height / 2) / window.innerHeight

		const count = 200
		const defaults = { origin: { x, y } }

		function fire(particleRatio: number, opts: any) {
			myConfetti({
				...defaults,
				...opts,
				particleCount: Math.floor(count * particleRatio)
			})
		}

		function shootConfetti() {
			fire(0.25, { spread: 26, startVelocity: 55 })
			fire(0.2, { spread: 60 })
			fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 })
			fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 })
			fire(0.1, { spread: 120, startVelocity: 45 })
		}

		// Darhol birinchi confetti
		shootConfetti()

		// Har 2 soniyada davom etadi
		confettiInterval = setInterval(shootConfetti, 2000)
	}

	const stopConfetti = () => {
		if (confettiInterval) {
			clearInterval(confettiInterval)
			confettiInterval = null
		}
	}

	onUnmounted(() => {
		stopConfetti()
	})

	return {
		confettiCanvas,
		targetElement,
		startConfetti,
		stopConfetti
	}
}
