const LoginReducer = (state, action) => {
	switch (action.type) {
		case "IMAGE_INFO":
			switch (action.field) {
				case "description":
					return {
						...state,
						description: action.payload,
						author: action.author === "jelena" ? "jelena" : "bojan",
					}
				case "price":
					return {
						...state,
						price: action.payload,
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
