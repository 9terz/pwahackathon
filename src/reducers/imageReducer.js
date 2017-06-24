const imageReducer = (state = {
    img: null,
    uploaded: false,
    name: '',
    bgOpactiy: 1.0,
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
            var bg = document.getElementById("bg-jpg");
            bg.style.opacity = state.bgOpactiy - action.payload;
            state = {
                ...state,
                bgOpactiy: state.bgOpactiy - action.payload
            };
            break;
    }
    return state;
};

export default imageReducer;