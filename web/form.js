import { server } from './server.js'

const form = document.querySelector('#form')
const input = document.querySelector('#url')
const content = document.querySelector('#content')
const button = document.querySelector('#button')

input.addEventListener('focusout', () => {
	button.disabled = input.value == null || input.value == ''
})

form.addEventListener('submit', async (event) => {
	event.preventDefault()
	content.classList.add('placeholder')

	const videoURL = input.value

	if (!videoURL.includes('shorts')) {
		content.textContent = 'A URL digitada não corresponde a um short do YouTube'
		content.style.color = '#d8d800'
		return
	}

	const [_, params] = videoURL.split('/shorts/')
	const videoId = params.split('?si')

	content.textContent = 'Obtendo texto a partir do áudio do short...'

	try {
		const transcription = await server.get('/summary/' + videoId)

		content.textContent = 'Resumindo texto obtido...'

		const summary = await server.post('/summary', {
			text: transcription.data.result,
		})

		content.textContent = summary.data.result
		content.classList.remove('placeholder')
	} catch (error) {
		content.textContent = 'Houve um erro inesperado. Tente novamente.'
		content.style.color = 'red'
	}
})
