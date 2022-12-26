const LoginReducer = (state, action) => {
	switch (action.type) {
		case "IMAGE_INFO":
			switch (action.field) {
				case "imgName":
					return {
						...state,
						imgName: action.payload,
						author: action.author === "jelena" ? "jelena" : "bojan",
					}
				case "year":
					return {
						...state,
						year: action.payload,
						author: action.author,
					}
				case "material":
					return {
						...state,
						material: action.payload,
						author: action.author,
					}
				case "dimensions":
					return {
						...state,
						dimensions: action.payload,
						author: action.author,
					}
				case "category":
					return {
						...state,
						category: action.payload,
						author: action.author,
					}
				default:
					return state
			}
		case "IMAGE_INPUT":
			return { ...state, image: action.payload }
		case "RESET":
			return { ...action.payload }
		default:
			return state
	}
}

export default LoginReducer
