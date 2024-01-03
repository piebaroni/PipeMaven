import axios from 'axios';
import { saveAs } from 'file-saver';

export default class APIService {

	static async EvaluatePipeline(body) {
		if (body.pipeline.length === 0) {
			alert("Please select a pipeline.");
			return null;
		}
		try {
			const response = await fetch('http://localhost:5000/evaluate', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			})
			if (response.status === 201) {
				alert("Pipeline executed!");
				const responseData = await response.json();
				return responseData;
			} else if (response.status === 400) {
				alert("Upload the dataset");
				return null;
			}
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	static async ExecPipeline(body) {
		if (body.pipeline.length === 0) {
			alert("Please select a pipeline.");
			return;
		}
		try {
			const response = await fetch('http://localhost:5000/exec', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body),
			})
			if (response.status === 201) {
				alert("Pipeline executed!");
			} else if (response.status === 400) {
				alert("Upload the dataset");
				return;
			}
		} catch (error) {
			return console.log(error)
		}
	}

	static async SetDataset(file) {
		if (!file) {
			alert("Please select a file to upload.");
			return;
		}
		const formData = new FormData();
		formData.append("file", file);
		console.log(formData)
		try {
			const response = await axios.post(
				"http://localhost:5000/dataset",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			if (response.status === 201) {
				alert("File uploaded successfully!");
				return;
			} else {
				alert("File upload failed.");
				return;
			}
		} catch (error) {
			console.error("Error uploading file:", error);
			return;
		}
	}

	static async GetDataset() {
		try {
			const response = await axios.get('http://localhost:5000/get_dataset');
			if (response.status === 200) {
				const type = 'text/csv';
				const file = new Blob([response.data], { type: type });
				saveAs(file, "output.csv");
			}
			else if (response.status === 400) {
				alert("No file to download");
			}
		} catch (error) {
			console.error('Error downloading file:', error);
			throw error;
		}
	}

	static async GetStats() {
		try {
			const response = await axios.get('http://localhost:5000/get_stats');
			if (response.status === 400) {
				alert("No dataset uploaded");
				return null;
			} else if (response.status === 200) {
				const responseData = await response.data;
				return responseData;}
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	static async GetPrep() {
		try {
			const response = await axios.get('http://localhost:5000/get_prep');
			if (response.status === 200) {
				const responseData = await response.data;
				return responseData;
			} else if (response.status === 400) {
				alert("No dataset uploaded");
				return null;
			}
		} catch (error) {
			console.log(error);
			return null;
		}
	}

}