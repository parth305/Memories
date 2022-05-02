import * as api from "../../api/index"

export let Authaction = (data) => async (dispatch) => {
    try {
        dispatch({ type: "AUTH", payload: data })
    } catch (error) {
        console.log(error);
    }
}

export let signup = (formData, navigate) => async (dispatch) => {
    try {

        let { data } = await api.signup(formData);
        // console.log(data);
        dispatch({ type: "SIGNUP", payload: data })

        navigate("/")
    } catch (error) {
        console.log(error);
    }
}

export let signin = (formData, navigate,showalert) => async (dispatch) => {
    try {
        let { data } = await api.singin(formData);
        // console.log("this is data", data);
        if (!data.success) {
            showalert("error", data.data)
        }
        else {
            dispatch({ type: "SIGNIN", payload: data })
            navigate("/")
        }
    } catch (error) {
        console.log(error.message);
    }
}
