const email = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
const password = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i.test(password)
const cPassword = (password, cPassword) =>
    cPassword == password
const noEmpty = (value) => !!value;

export const validations = {
    email,
    password,
    cPassword,
    noEmpty,
};