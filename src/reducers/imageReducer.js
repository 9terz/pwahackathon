const imageReducer = (state = {
    img: null,
    uploaded: false,
    name: ''
}, action) => {
    switch (action.type) {
        case "UPLOAD":
            console.log('reducer upload called');
            state = {
                ...state,
                upload: true
            };
            break;
        case "SET_NAME":
            console.log(`SET_NAME: ${action.payload}`);
            state = {
                ...state,
                name: action.payload
            };
            break;
    }
    return state;
};

export default imageReducer;