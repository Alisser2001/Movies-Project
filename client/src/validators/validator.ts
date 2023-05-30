export function emailValidator(email: string){
    const emailRegEx = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegEx.test(email);
}

export function passwordValidator(pass: string){
    return pass.length>6;
}

export function nameValidator(name: string){
    return name.length > 3 && name.length < 50
}