export interface RegisterRequest {
    email: string;
    password: string;
    name: string;
};

export function validateRegisterRequest(data: unknown):data is RegisterRequest {
    const errors: string[] = [];
    if (Object.prototype.toString.call(data) !== "[object Object]") {
        errors.push("Input not an object");
        return false;
    }
    const obj = data as Record<string, unknown>;

    if (Object.keys(obj).length != 3) {
        errors.push("Expected 3 fields, get " + Object.keys(obj).length);
        return false;
    }

    if (!(typeof obj.email === "string" && typeof obj.password === "string" && typeof obj.name === "string")) {
        errors.push("Expected only strings, got " + Object.keys(obj));
        return false;
    };

    if (obj.email.trim() === "" || !obj.email.includes("@") || obj.email.length > 255) {
        errors.push("Invalid email, expected @, got " + obj.email);
        return false;
    };

    if (obj.password.length < 6 || obj.password.length > 255) {
        errors.push("Invalid password, expected length between 6 and 255, got " + obj.password.length);
        return false;
    };

    if (obj.name.length > 255) {
        errors.push("Invalid name, expected length less than 255, got " + obj.name.length);
        return false;
    };

    return true;
    
};