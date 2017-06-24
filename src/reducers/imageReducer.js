const imageReducer = (state = {
    img: null,
    uploaded: false
}, action) => {
    switch (action.type) {
        case "UPLOAD":
            //TODO : upload img to firebase
            state = {
                ...state,
                upload: true
            };
            break;
    }
    return state;
};

export default imageReducer;