use regex::Regex;

fn validate_password(password: &str) -> bool {
    let length_ok = password.len() >= 8;
    let has_uppercase = Regex::new(r"[A-Z]").unwrap().is_match(password);
    let has_lowercase = Regex::new(r"[a-z]").unwrap().is_match(password);
    let has_digit = Regex::new(r"\d").unwrap().is_match(password);
    let has_special_char = Regex::new(r"[!@#$%^&*(),.?\":{}|<>]").unwrap().is_match(password);

    length_ok && has_uppercase && has_lowercase && has_digit && has_special_char
}
