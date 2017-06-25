const imageReducer = (state = {
    img: null,
    uploaded: false,
    name: '',
    bgOpactiy: 1.0,
    result:''
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
        case "DEC_OPACITY":
            let newOpacity = state.bgOpactiy - action.payload;
            var bg = document.getElementById("bg-jpg");
            bg.style.opacity = newOpacity;
            state = {
                ...state,
                bgOpactiy: newOpacity
            };
            break;
        case "SET_RESULT":
            state = {
                ...state,
                result: action.payload
            }
            break;
    }
    return state;
};

export default imageReducer;