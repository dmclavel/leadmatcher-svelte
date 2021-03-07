import isEmail from 'validator/lib/isEmail';

const passwordSpecialCase = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

const passwordCapitalCase = /[A-Z]/;

const signInAsyncValidate = (userOrEmailParam = '', passwordParam = '') => 
    new Promise((resolve, reject) => {
        try {
            let userOrEmail = userOrEmailParam.trim();
            let password = passwordParam.trim();
            let errorObjects = {};

            if (userOrEmail.length === 0) {
                errorObjects.userOrEmail = 'Username / Email field cannot be empty.';
            }

            if (password.length < 8) {
                errorObjects.password = 'Password requires at least 8 characters.';
            } else if (password.length > 32) {
                errorObjects.password = 'Up to 32 characters are allowed for the Password.';
            } else if (!passwordCapitalCase.test(password)) {
                errorObjects.password = 'Password is missing an uppercase letter.';
            } else if (!passwordSpecialCase.test(password)) {
                errorObjects.password = `Password is missing a special character. 
                Any of these is accepted: \`!@#$%^&*()_+-=[]{};':"|,.<>/?~
                `;
            }

            if (Object.keys(errorObjects).length > 0) {
                reject(errorObjects);
            } else {
                resolve();
            }
        } catch (e) {
            reject('Unexpected Error!');
        }
    });

const signUpAsyncValidate = (usernameParam = '', emailParam = '', passwordParam = '') => 
    new Promise((resolve, reject) => {
        try {
            let username = usernameParam.trim();
            let email = emailParam.trim();
            let password = passwordParam.trim(); 
            let errorObjects = {};
            if (username.length < 6) {
                errorObjects.username = 'Username requires at least 6 characters.';
            } else if (username.length > 12) {
                errorObjects.username = 'Up to 12 characters are allowed for the Username.';
            }

            if (!isEmail(email)) {
                errorObjects.email = 'Email address provided is invalid.';
            }

            if (password.length < 8) {
                errorObjects.password = 'Password requires at least 8 characters.';
            } else if (password.length > 32) {
                errorObjects.password = 'Up to 32 characters are allowed for the Password.';
            } else if (!passwordCapitalCase.test(password)) {
                errorObjects.password = 'Password is missing an uppercase letter.';
            } else if (!passwordSpecialCase.test(password)) {
                errorObjects.password = `Password is missing a special character. 
                Any of these is accepted: \`!@#$%^&*()_+-=[]{};':"|,.<>/?~
                `;
            }

            if (Object.keys(errorObjects).length > 0) {
                reject(errorObjects);
            } else {
                resolve();
            }
        } catch (e) {
            reject('Unexpected Error!');
        }
    });

export {
    signInAsyncValidate,
    signUpAsyncValidate,
};