import { Errors } from './constants';

interface User {
    id: number;
    email: string;
    name: string;
    role: rolesEnum;
  }

const validateName = (name: string, data: { users: User[]; }) => {
    if (!name) {
        return Errors.NAME_REQUIRED;
    } else if (data.users.some((user: User) => user.name === name)) {
        return  Errors.NAME_IN_USE;
    } else if (name.length > 30 || name.length < 3) {
        return Errors.INVALID_NAME_LENGTH;
    } else {
        return;
    }
}

const validateEmail = (email: string, data: { users: User[]; }) => {
    if (!email) {
        return Errors.EMAIL_REQUIRED;
    } else if (data.users.some((user: User) => user.email === email)) {
        return  Errors.EMAIL_IN_USE;
    } else if (email.length > 30 || email.length < 3) {
        return Errors.INVALID_EMAIL_LENGTH;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return Errors.INVALID_EMAIL;
    } else {
        return;
    }
}

export { validateName, validateEmail };