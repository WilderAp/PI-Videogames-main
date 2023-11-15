export const validations = (form) => {
    const regexName = /^[A-Z][A-Za-z0-9 ]*$/;
    const regexUrl = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    let errors = {};

    if (!form.name || form.image === " ") {
        errors.name = "A name is required";
    }
    if (!regexName.test(form.name)) {
        errors.name =
            "The name cannot have special characters or tildes and must start with an uppercase letter";
    }
    if (form.name.length < 3) {
        errors.name = "The name cannot be less than 3 characters";
    }
    if (form.name.length > 30) {
        errors.name = "The name cannot be longer than 30 characters";
    }
    if (!form.image || form.image === " ") {
        errors.image = "The image field is required";
    }
    if (!regexUrl.test(form.image)) {
        errors.image = "the image shield must be filled with a valid url";
    }
    if (!form.description || form.description === " ") {
        errors.description = "The description shield must be filled";
    }
    if (form.description.length < 30) {
        errors.description = "Not valid description, must contain at least 30 character";
    }
    if (!form.platforms || form.platforms.length === " ") {
        errors.platforms = "Must select a platform";
    }
    if (!form.date || form.date === " ") {
        errors.date = "Select at least the released date";
    }
    if (form.rating === "Select Rating") {
        errors.rating = "Select a rating number";
    }
    if (!form.genres || form.genres.length === 0) {
        errors.countries = "Select Genres";
    }
    if (Object.keys(form).length === 0) {
        errors.form = "Incomplete fields";
    }

    return errors;
};
