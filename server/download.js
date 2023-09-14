import ytdl from 'ytdl-core'
import fs from 'fs'

export const download = (videoId) =>
	new Promise((resolve, reason) => {
		const videoURL = 'https://youtube.com/shorts/' + videoId

		ytdl(videoURL, { quality: 'lowestaudio', filter: 'audioonly' })
			// .on('info', (info) => {
			// 	console.log(info)
			// })
			.on('end', () => {
				console.log('download finalizado')
				resolve()
			})
			.on('error', (error) => {
				console.log('Erro: ', error)
				reject(error)
			})
			.pipe(fs.createWriteStream('./tmp/audio.mp4'))
	})
