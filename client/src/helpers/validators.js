const validators = {
    firstname: (value) => {
        const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/;
        if (!value) {
            return false
        }
        if(value.length < 3 || value.length > 20) {
            return false;
        }
        if(!regex.test(value)) {
            return false;
        }
        return true;
    },
    lastname: (value) => {
        const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/;
        if (!value) {
            return false
        }
        if(value.length < 3 || value.length > 20) {
            return false;
        }
        if(!regex.test(value)) {
            return false;
        }
        return true;
    },
    phone: (value) => {
        const regex = /^\d{2}-\d{2}-\d{2}-\d{2}-\d{2}$/;
        if (!value) {
            return false;
        }
        if(!regex.test(value)) {
            return false;
        }
        return true;
    },
    city: (value) => {
        const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ-' ]+$/;
        if (!value) {
            return false
        }
        if(value.length < 3 || value.length > 20) {
            return false;
        }
        if(!regex.test(value)) {
            return false;
        }
        return true;
    },
    country: (value) => {
        const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/;
        if (!value) {
            return false
        }
        if(value.length < 3 || value.length > 20) {
            return false;
        }
        if(!regex.test(value)) {
            return false;
        }
        return true;
    },
}

export default validators;