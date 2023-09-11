export default class APIService{
	
	static async EvaluatePipeline(body){
		try {
			const response = await fetch('http://localhost:5000/evaluate', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			})
			return await response.json()
		} catch (error) {
			return console.log(error)
		}
	}

    static async ExecPipeline(body){
		try {
			const response = await fetch('http://localhost:5000/exec', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			})
			return await response.json()
		} catch (error) {
			return console.log(error)
		}
	}

}