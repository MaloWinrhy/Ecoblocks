use actix_web::{HttpResponse, Responder};
use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;

pub async fn get_logs() -> impl Responder {
    let path = "log/output.log";
    if let Ok(lines) = read_lines(path) {
        let logs: Vec<String> = lines.filter_map(Result::ok).collect();
        HttpResponse::Ok().json(logs)
    } else {
        HttpResponse::InternalServerError().body("Failed to read logs")
    }
}

fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where
    P: AsRef<Path>,
{
    let file = File::open(filename)?;
    Ok(io::BufReader::new(file).lines())
}
