/** @type {import('tailwindcss').Config} */

export default {
	darkMode: 'class',
	content: [
		'./components/**/*.{js,vue,ts}',
		'./directives/**/*.{js,vue,ts}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./nuxt.config.{js,ts}',
		'./app.vue',
		'./error.vue'
	],
	theme: {
		extend: {
			container: {
				center: true,
				padding: {
					DEFAULT: '8px',
					sm: '20px'
				},
				screens: {
					sm: '1440px'
				}
			},
			colors: {
				blue: {
					DEFAULT: '#0083FF',
					light: '#F3F6F8'
				},
				gray: {
					DEFAULT: '#E9EEF1',
					1: '#D5DADD',
					2: '#B3B3B3',
					3: '#697583'
				},

				dark: {
					1: '#2B2B2B',
					2: '#0E0F11',
					DEFAULT: '#020D17'
				}
			},
			lineHeight: {
				120: '120%',
				130: '130%',
				140: '140%'
			},
			fontSize: {},
			boxShadow: {
				main: `
    			0 367px 103px 0 rgba(215,218,223,0.00),
    			0 235px 94px 0 rgba(215,218,223,0.01),
    			0 132px 79px 0 rgba(215,218,223,0.05),
    			0 59px 59px 0 rgba(215,218,223,0.09),
    			0 15px 32px 0 rgba(215,218,223,0.10)
  			`,
				card: '0 416px 117px 0 rgba(0, 0, 0, 0.00),0 266px 107px 0 rgba(0, 0, 0, 0.01),0 150px 90px 0 rgba(0, 0, 0, 0.03),0 67px 67px 0 rgba(0, 0, 0, 0.05),0 17px 37px 0 rgba(0, 0, 0, 0.06)'
			},
			borderColor: {},
			zIndex: {
				1: '1',
				2: '2',
				3: '3',
				4: '4',
				5: '5',
				6: '6',
				7: '7',
				8: '8',
				9: '9',
				11: '11',
				12: '12',
				13: '13',
				14: '14',
				15: '15',
				16: '16',
				17: '17',
				18: '18',
				19: '19',
				21: '21',
				22: '22',
				23: '23',
				24: '24',
				25: '25',
				26: '26',
				27: '27',
				28: '28',
				29: '29',
				40: '40'
			}
		}
	},
	plugins: []
}
